export const typeDefs = `
type Room {
  id: String!
  roomName: String!
}
type Message {
  id: String!
  user: String!
  content: String!
  roomId: String!
}

type Query {
  messages: [Message!]
}

type Mutation {
  createRoom(roomName: String!): Room!
  joinRoom(roomName: String!): Room!
  sendMessage(user: String!, content: String!,roomId:String!): Message!
}

type Subscription {
  messages: [Message!]
}
`;
