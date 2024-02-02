// DATA
const messages = [];
const rooms = [];
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

export const resolvers = {
  Query: {
    messages: () => messages,
  },
  
  Mutation: {
    createRoom: (_, { roomName }) => {
      const roomExists = rooms.find(
        (existingRoom) => existingRoom.roomName === roomName
      );
      if (roomExists) {
        throw new Error("ห้องนี้มีอยู่แล้ว");
      }
      const newRoom = {
        id: String(rooms.length + 1),
        roomName,
      };
      rooms.push(newRoom);
      return newRoom;
    },

    joinRoom: (_, { roomName }) => {
      if (!rooms.find((r) => r.roomName === roomName)) {
        throw new Error("ไม่พบห้องนี้");
      }
      return rooms.find((r) => r.roomName === roomName);
    },

    sendMessage: (_, { user, content, roomId }) => {
      const roomExists = rooms.some((r) => r.id === roomId);
      if (!roomExists) {
        throw new Error("ไม่พบห้องนี้");
      }
      const messageData = {
        id: String(messages.length + 1),
        user,
        content,
        roomId,
      };
      messages.push(messageData);
      subscribers.forEach((fn) => fn());
      return messageData;
    },
  },

  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() => pubsub.publish(channel, { messages }));
        setTimeout(() => pubsub.publish(channel, { messages }), 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};
