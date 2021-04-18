const cron = require("node-cron");
const Chat = require("../models/Chat");

let task;
module.exports = function (app, io) {
  app.post("/cron/chat/schedule/:id", async (req, res) => {
    const { num, clearChat } = req.body;
    await console.log(num);
    const chat = await Chat.findById(req.params.id);
    if (num > 0 && !task && clearChat) {
      task = cron.schedule(`*/${num} * * * *`, async () => {
        try {
          chat.clearChat = clearChat;
          chat.messages = [];
          await chat.save();
        } catch (e) {
          console.warn(e.message);
        }
      });
      await io.emit("chatPurged", { chat });
    } else if (num <= 0 && task) {
      chat.clearChat = false;
      await chat.save();
      await task.stop();
      task = null;
    } else {
      chat.clearChat = false;
      await chat.save();
      task = null;
      return;
    }
  });
};
