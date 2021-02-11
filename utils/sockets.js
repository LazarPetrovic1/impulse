const Chat = require('../models/Chat');
const { checker } = require('./chat');

const socketHolder = (io) =>
  io.on("connection", (socket) => {
    socket.on("spawnChat", async ({ people, message, userId }) => {
      const chat = new Chat({
        people,
        messages: [{
          user: userId,
          body: message,
          date: Date.now()
        }],
        date: Date.now()
      })
      await chat.save()
      io.emit('chatSpawned', chat)
    })
    socket.on("message", async ({ _id, body, userId }) => {
      const chat = await Chat.findById(_id)
      await console.log(chat);
      await chat.messages.push({ user: userId, body, date: Date.now() })
      await chat.save()
      io.emit('message', { chatStuff: chat, userId })
    });
    socket.on("getChat", async ({ userId, theirId }) => {
      let chat;
      chat = await Chat.find({ people: [userId, theirId] })
      await console.log(chat);
      if (!chat) chat = await Chat.find({ people: [theirId, userId] })
      if (!chat) return
      io.emit('getChat', chat[0])
    })
  });

module.exports = socketHolder;
