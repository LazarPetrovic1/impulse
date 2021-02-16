const Chat = require('../models/Chat');
const Notif = require('../models/Notif');
const { getText } = require('./notifutils');
const User = require('../models/User');

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
      await chat.messages.push({ user: userId, body, date: Date.now() })
      await chat.save()
      io.emit('message', { chatStuff: chat, userId })
    });
    socket.on("getChat", async ({ userId, theirId }) => {
      let chat;
      chat = await Chat.find({ people: [userId, theirId] })
      if (!chat || chat.length < 1) chat = await Chat.find({ people: [theirId, userId] })
      if (!chat) return
      io.emit('getChat', chat[0])
    })
    socket.on("sendNotif", async ({ userId, type, language, username, name }) => {
      const message = getText({ type, language, username, name })
      const notif = new Notif({
        user: userId,
        text: message,
        date: Date.now(),
        read: false,
        type
      })
      await notif.save()
      io.emit('sentNotif', notif)
    })
    socket.on('readNotifs', notifs => {
      notifs.forEach(async (notif) => {
        notif.read = true
        await notif.save()
      });
      io.emit('readNotifs', notifs)
    })
    socket.on('findNotif', async (userId) => {
      const notifs = await Notif.find({ user: userId })
      io.emit('foundNotifs', { notifications: notifs, id: userId })
    })
    socket.on('acceptFriend', async ({ senderId, accepterId }) => {
      const senderUser = await User.findById(senderId)
      const accepterUser = await User.findById(accepterId)
      await senderUser.friends.push({ user: accepterId })
      await accepterUser.friends.push({ user: senderId })
      await senderUser.save()
      await accepterUser.save()
      await io.emit('friendAccepted', accepterUser)
    })
    socket.on('rejectFriend', async ({ notifId }) => {
      await Notif.deleteOne({ id: notifId })
      await io.emit('friendRejected')
    });
  })

module.exports = socketHolder;
