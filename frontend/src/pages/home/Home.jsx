import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  const [hidden , sethidden] = useState(false)
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("chat-app");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const userName = parsedData?.data?.username;
      if (userName) {
        setUsername(userName);
      }
    }
  }, []);

  return (
    <div className="flex flex-col  md:flex-row h-screen md:h-[80vh] w-full max-w-5xl mx-auto rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop:backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SideBar hidden={hidden} sethidden={sethidden} />
      <MessageContainer username={username}   hidden={hidden}  sethidden={sethidden} />
    </div>
  );
};

export default Home;

