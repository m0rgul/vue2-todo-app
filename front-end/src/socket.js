import io from "socket.io-client";
const socket = io("http://localhost:3000");

socket.on("error", (msg) => {
  console.error("[Socket error]", msg);
});

export default socket;
