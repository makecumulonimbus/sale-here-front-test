const initialState = {
  names: "",
  roomState: "CREATE_ROOM",
  roomName: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NAME":
      return {
        ...state,
        names: action.payload,
      };
    case "SET_ROOM_STATE":
      return {
        ...state,
        roomState: action.payload,
      };
    case "SET_ROOM":
      return {
        ...state,
        roomName: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
