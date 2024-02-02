import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createApolloClient } from "./service/apollo";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Home from "./pages/home.jsx";
import Room from "./pages/room.jsx";
import ChatRoom from "./pages/chat.jsx";

const App = () => {
  const client = createApolloClient;
  return (
    <ApolloProvider client={client}>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/room" element={<Room />} />
          <Route exact path="/room/:id" element={<ChatRoom />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ApolloProvider>
  );
};

export default App;
