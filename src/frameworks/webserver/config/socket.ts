import { Server, Socket } from "socket.io";

import { app } from "./app";
import { createServer } from "http";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socketTypes";

const httpServer = createServer(app);

const Io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: process.env.CLIENT,
  },
});

Io.on("connect", (client) => {
  console.log("A user connected:", client.id);

  client.on("createAnnouncement", (announcement) => {
    Io.emit("newAnnouncement", announcement);
  });

  client.on("addMessage", (message) => {
    Io.emit("newMessage", message);
  });

  client.on("disconnect", () => {
    console.log("the client ", client.id, " has been disconected");
  });
});

export { httpServer, Io };
