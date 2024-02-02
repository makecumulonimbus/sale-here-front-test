import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addName, setRoomState } from "../store/actions";

const Home = ({ names, addName, setRoomState }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) return;
    addName(name);
  };

  const handleCreateRoom = () => {
    setRoomState("CREATE_ROOM");
    navigate("/room");
  };

  const handleJoinRoom = () => {
    setRoomState("JOIN_ROOM");
    navigate("/room");
  };

  return (
    <>
      {!names && (
        <div className="container-body container-transition form-input">
          <form onSubmit={handleSubmit}>
            <div className="title text-center">ชื่อของคุณ</div>
            <div className="text-input my-30">
              <input
                className="form-control"
                autoComplete="off"
                value={name}
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                className={`button-app ${name ? "show" : "hide"}`}
                type="submit"
              >
                ยืนยัน
              </button>
            </div>
          </form>
        </div>
      )}

      {names && (
        <div className="container-body container-transition welcome-container">
          <div className="title text-center"> คุณ {names}</div>
          <div className="btn-box text-center">
            <button className="button-app" onClick={handleCreateRoom}>
              สร้างห้องใหม่
            </button>
            <button className="text-button" onClick={handleJoinRoom}>
              เข้าร่วมแชท
            </button>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  names: state.names,
});

export default connect(mapStateToProps, { addName, setRoomState })(Home);
