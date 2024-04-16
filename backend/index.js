const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: process.env.PORT || 9000 });

function generateMessage() {
  const messageData = [
    "Hey, How are you",
    "LOL nice shot",
    "Sheesh",
    "LOL whats wrong with him",
    "Aww Hell Nah",
    "LUL nice shot",
  ];

  const userData = [
    {
      name: "PlayBoiCatty",
      id: 1,
      color: "#fca5a5",
    },
    {
      name: "Mizz",
      id: 2,
      color: "#fdba74",
    },
    {
      name: "Ninja",
      id: 3,
      color: "#fcd34d",
    },
    {
      name: "Tfue",
      id: 4,
      color: "#bef264",
    },
    {
      name: "Luffy",
      id: 5,
      color: "#22c55e",
    },
    {
      name: "Mizz",
      id: 6,
      color: "#6ee7b7",
    },
  ];

  const messageIndex = Math.floor(Math.random() * messageData.length);
  const userIndex = Math.floor(Math.random() * userData.length);

  const message = messageData[messageIndex];
  const user = userData[userIndex];

  return { user, message }; // Return the object directly
}

function sendMessage() {
  const message = generateMessage();
  const messageString = JSON.stringify(message); // Convert object to JSON string
  console.log(message);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageString);
    }
  });
}

setInterval(sendMessage, 1000);

console.log(`WebSocket is running on port ${process.env.PORT || 9000}`);
