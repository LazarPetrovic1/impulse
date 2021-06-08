const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const socketHolder = require("./utils/sockets");
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
  },
});

const corsOptions = {
  origin: ["*"],
  allowedHeaders: [
    "Access-Control-Expose-Headers",
    "Content-Range",
    "Accept-Ranges",
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Methods",
    "Access-Control-Request-Headers",
    "Content-Length",
  ],
  credentials: true,
  enablePreflight: true,
};

const connectDB = require("./config/db");

socketHolder(io);

// Database connection
connectDB();

// Init middleware
app.use(express.json({ limit: "200mb", extended: true }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors(corsOptions));

// Define the routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/notifs", require("./routes/api/notifs"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/imageposts", require("./routes/api/imagepost"));
app.use("/api/forumposts", require("./routes/api/forumpost"));
app.use("/api/videoposts", require("./routes/api/videopost"));
app.use("/api/group", require("./routes/api/group"));
app.use("/api/status", require("./routes/api/status"));
app.use("/api/checkregister", require("./routes/api/register"));
app.use("/api/allmedia", require("./routes/api/allmedia"));

app.use("/impulse/api/v1/users", require("./routes/public/users"));
app.use("/impulse/api/v1/status", require("./routes/public/status"));
app.use("/impulse/api/v1/videos", require("./routes/public/videopost"));
app.use("/impulse/api/v1/forum", require("./routes/public/forumpost"));

require("./utils/cron")(app, io);

// Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
