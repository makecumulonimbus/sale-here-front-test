import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useSubscription } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SEND_MESSAGE, SUBSCRIPTION_MESSAGE } from "../graphql/schema";

const ChatRoom = ({ names, roomName }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  if (!names) {
    navigate("/", { replace: true });
  }

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const { data: subscriptionData } = useSubscription(SUBSCRIPTION_MESSAGE);

  useEffect(() => {
    if (subscriptionData) {
      const filteredMessages = subscriptionData.messages.filter(
        (msg) => msg.roomId === params.id
      );

      setMessages(filteredMessages);

      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [subscriptionData, params.id]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const clientHeight = chatContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;

      chatContainerRef.current.scrollTo({
        top: maxScrollTop > 0 ? maxScrollTop : 0,
        behavior: "smooth",
      });
    }
  };

  const handleMutationError = (error) => {
    console.error("Error sending message:", error.message);
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (textMessage === "") return;
    try {
      await sendMessageMutation({
        variables: { user: names, content: textMessage, roomId: params.id },
      });

      setTextMessage("");
    } catch (error) {
      handleMutationError(error);
    }
  };

  return (
    <>
      <div className="container-transition chat-room">
        <div className="text-chat">ห้อง {roomName}</div>
        <div className="box-message" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-data ${
                message.user === names ? "right" : "left"
              }`}
            >
              <div className="box-by">
                คุณ {message.user !== names && message.user}
              </div>
              <div className="box-msg">{message.content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="box-input">
        <form onSubmit={handleSendMessage}>
          <div className="text-input chat-text">
            <input
              className="form-control"
              type="text"
              placeholder=""
              autoComplete="off"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
            />
            <span className="placeholder-input-custom">Enter เพื่อส่ง</span>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  names: state.names,
  roomName: state.roomName,
});

export default connect(mapStateToProps)(ChatRoom);
