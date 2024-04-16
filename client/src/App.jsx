import { useState, useEffect, useRef } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messageEndRef = useRef();
  function createConnection() {
    const ws = new WebSocket("ws://localhost:9000");

    return ws;
  }

  useEffect(() => {
    const socket = createConnection();
    socketRef.current = socket;

    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);

      setMessages((prev) => [...prev, message]);
    };

    console.log(messages);

    messageEndRef.current?.scrollIntoView({ behaviour: "smooth" });
    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [messages]);

  return (
    <>
      <div className="bg-slate-900 color-900 text-slate-50 ">
        <h1 className="font-black text-4xl">Chat</h1>
        <hr className="mt-2" />
        <div className="overflow-y-scroll" style={{ height: "40vh" }}>
          {messages.map((message) => {
            return (
              <>
                <p className="m-3" style={{ color: message.user.color }}>
                  {message.user.name}{" "}
                  <span className="text-white">{message.message}</span>
                </p>
              </>
            );
          })}
          <div ref={messageEndRef}></div>
        </div>
      </div>
      <div>
        <input
          className="shadow-lg bg-slate-500 w-screen text-white p-1"
          type="text"
        />
      </div>
    </>
  );
};

export default App;
