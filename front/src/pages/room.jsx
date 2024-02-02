import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setRoom } from "../store/actions";
import { CREATE_ROOM, GET_ROOM_ID } from "../graphql/schema";
import { Link } from "react-router-dom";

const Room = ({ names, roomState, setRoom }) => {
  const navigate = useNavigate();
  const [stateRoom, setStateRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  if (!names) {
    navigate("/", { replace: true });
  }
  useEffect(() => {
    setStateRoom(roomState);
  }, [roomState]);

  const [createRoom] = useMutation(CREATE_ROOM);
  const [joinRoom] = useMutation(GET_ROOM_ID);

  const showToast = (message, type = "error") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
      toastStyle: {
        fontSize: "16px",
        fontFamily: "Prompt",
      },
    });
  };

  const handleCreateRoom = async () => {
    try {
      const { data } = await createRoom({ variables: { roomName: roomName } });
      const roomId = data.createRoom.id;
      setRoom(roomName);
      navigate(`/room/${roomId}`, { replace: true });
    } catch (error) {
      console.error("Error sending message:", error.message);
      showToast(error.message);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const { data } = await joinRoom({
        variables: { roomName: roomName },
      });
      const roomId = data.joinRoom.id;
      setRoom(roomName);
      navigate(`/room/${roomId}`, { replace: true });
    } catch (error) {
      setRoomName("");
      console.error("Error sending message:", error.message);
      showToast(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!roomName) {
      showToast("กรุณากรอกชื่อห้อง", "warning");
      return;
    }

    stateRoom === "CREATE_ROOM" ? handleCreateRoom() : handleJoinRoom();
  };

  return (
    <div className="container-body container-transition form-crate-join-room">
      <div className="title text-center">
        {stateRoom === "CREATE_ROOM" ? "สร้างห้องใหม่" : "เข้าร่วมแชท"}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="text-input text-center my-30">
          <input
            type="text"
            className="form-control"
            autoComplete="off"
            name="roomName"
            placeholder={stateRoom === "CREATE_ROOM" ? "" : "ชื่อห้อง"}
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className="btn-box-row">
          <Link to="/" className="text-button">
            กลับ
          </Link>
          <button type="submit" className="button-app">
            {stateRoom === "CREATE_ROOM" ? "ยืนยัน" : "เข้าร่วม"}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  names: state.names,
  roomState: state.roomState,
});

export default connect(mapStateToProps, { setRoom })(Room);
