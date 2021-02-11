const express = require("express");
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const PORT = process.env.PORT || 5000;
const app = express();
const socketHolder = require('./utils/sockets');
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*"
  }
})

const connectDB = require("./config/db");

socketHolder(io)

// Database connection
connectDB();

// Init middleware
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

app.get("/", (req, res) => {
  res.send("Bye, man.");
});

// Define the routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/notifs", require("./routes/api/notifs"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/imageposts", require("./routes/api/imagepost"));
app.use("/api/forumposts", require("./routes/api/forumpost"));
app.use("/api/videoposts", require("./routes/api/videopost"));

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
