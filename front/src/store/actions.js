export const addName = (name) => ({
  type: "ADD_NAME",
  payload: name,
});

export const setRoomState = (state) => ({
  type: "SET_ROOM_STATE",
  payload: state,
});

export const setRoom = (name) => ({
  type: "SET_ROOM",
  payload: name,
});
