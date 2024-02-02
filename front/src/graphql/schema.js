import { gql } from "@apollo/client";

const CREATE_ROOM = gql`
  mutation createRoom($roomName: String!) {
    createRoom(roomName: $roomName) {
      id
      roomName
    }
  }
`;

const GET_ROOM_ID = gql`
  mutation joinRoom($roomName: String!) {
    joinRoom(roomName: $roomName) {
      id
      roomName
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($user: String!, $content: String!, $roomId: String!) {
    sendMessage(user: $user, content: $content, roomId: $roomId) {
      id
      user
      content
      roomId
    }
  }
`;

const SUBSCRIPTION_MESSAGE = gql`
  subscription onMessageAdded {
    messages {
      content
      id
      user
      roomId
    }
  }
`;

export { CREATE_ROOM, GET_ROOM_ID , SEND_MESSAGE, SUBSCRIPTION_MESSAGE}