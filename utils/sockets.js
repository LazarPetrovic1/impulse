const Chat = require("../models/Chat");
const Notif = require("../models/Notif");
const { getText } = require("./notifutils");
const User = require("../models/User");
const { getLastX, dateSort } = require("./arr");
const cloudinary = require("./cloudinary");

const socketHolder = (io) =>
  io.on("connection", (socket) => {
    socket.on(
      "spawnChat",
      async ({ people, message, userId, isGroup, name }) => {
        try {
          const chat = new Chat({
            people,
            messages: [
              {
                user: userId,
                body: message,
                date: Date.now(),
              },
            ],
            isGroup,
            name,
            date: Date.now(),
          });
          await chat.save();
          io.emit("chatSpawned", chat);
        } catch (e) {
          console.warn(e.message);
        }
      }
    );
    socket.on("getInitialChatState", async ({ people, page, limit }) => {
      try {
        let chat;
        let messages = [];
        chat = await Chat.find({ people: { $all: [...people] } });
        const startIndex = (await chat[0].messages.length) - limit * page;
        const endIndex = (await chat[0].messages.length) - (page - 1) * limit;
        if (!chat) return;
        if (endIndex > 0 && startIndex < 0)
          messages = await chat[0].messages.slice(0, endIndex);
        else if (endIndex > 0 && startIndex > 0)
          messages = await chat[0].messages.slice(startIndex, endIndex);
        else if (endIndex < 0 && startIndex < 0) messages = [];
        const hasMoreValue = startIndex < chat[0].messages.length;
        const newChat = {
          people: chat[0].people,
          messages,
          date: chat[0].date,
          _id: chat[0].id,
        };
        io.emit("gotInitialChatState", { newChat, hasMoreValue });
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on("message", async ({ _id, body, userId, isMedia, media }) => {
      try {
        const chat = await Chat.findById(_id);
        let urls = [];
        if (isMedia) {
          for await (const item of media) {
            if (item.type === "gif") {
              await urls.push({
                name: item.name,
                type: item.type,
                src: item.src,
              });
            } else {
              const uploadResponse = await cloudinary.uploader.upload(
                item.res,
                { resource_type: item.type }
              );
              await urls.push({
                name: item.name,
                type: item.type,
                src: uploadResponse.url,
              });
            }
          }
          await chat.messages.push({
            user: userId,
            body,
            date: Date.now(),
            isMedia,
            media: urls,
          });
        } else
          await chat.messages.push({
            user: userId,
            body,
            date: Date.now(),
            isMedia: false,
            media: [],
          });
        await chat.save();
        const message = chat.messages[chat.messages.length - 1];
        io.emit("message", { message });
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on("getChat", async ({ userId, theirId }) => {
      try {
        let chat;
        chat = await Chat.find({ people: [userId, theirId] });
        if (!chat || chat.length < 1)
          chat = await Chat.find({ people: [theirId, userId] });
        if (!chat) return;
        io.emit("getChat", chat[0]);
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on("purgeChat", async ({ id }) => {
      try {
        const chat = await Chat.findById(id);
        chat.messages = [];
        await chat.save();
        await io.emit("chatPurged", { chat });
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on(
      "sendNotif",
      async ({ userId, type, language, username, name, url }) => {
        try {
          const message = getText({ type, language, username, name });
          const notif = new Notif({
            user: userId,
            text: message,
            date: Date.now(),
            read: false,
            type,
            url,
          });
          await notif.save();
          io.emit("sentNotif", notif);
        } catch (e) {
          console.warn(e.message);
        }
      }
    );
    socket.on("readNotifs", async (userId) => {
      try {
        const notifs = await Notif.find({ user: userId });
        notifs.forEach(async (notif) => {
          if (!notif.read) {
            notif.read = true;
            await notif.save();
          }
        });
        io.emit("readNotifs", notifs);
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on("findNotif", async (userId) => {
      try {
        const notifs = await Notif.find({ user: userId });
        io.emit("foundNotifs", { notifications: notifs, id: userId });
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on("acceptFriend", async ({ senderId, accepterId }) => {
      try {
        const senderUser = await User.findById(senderId);
        const accepterUser = await User.findById(accepterId);
        await senderUser.friends.push({ user: accepterId });
        await accepterUser.friends.push({ user: senderId });
        await senderUser.save();
        await accepterUser.save();
        await io.emit("friendAccepted", accepterUser);
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on("rejectFriend", async ({ notifId }) => {
      try {
        await Notif.findByIdAndDelete(notifId);
        await io.emit("friendRejected");
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on("sendFriendRequest", async ({ senderId, accepterId }) => {
      try {
        const senderUser = await User.findById(senderId);
        await senderUser.friendRequestsSent.push({ user: accepterId });
        await senderUser.save();
        await io.emit("sentFriendRequest", senderUser);
      } catch (e) {
        console.warn(e.message);
      }
    });
    socket.on("findGroupChats", async ({ userId }) => {
      try {
        const chats = await Chat.find({
          people: { $all: [userId] },
          name: { $ne: "" },
        });
        await io.emit("foundGroupChats", { chats });
      } catch (e) {
        console.warn(e.message);
      }
    });
  });

module.exports = socketHolder;
