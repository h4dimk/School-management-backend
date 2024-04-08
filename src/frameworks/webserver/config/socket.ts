import { Server } from "socket.io";

import { app } from "./app";
import { createServer } from "http";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socketTypes";

const httpServer = createServer(app);

const Io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

Io.on("connect", (client) => {
  client.on("disconnect", () => {
    console.log("the client ", client.id, " has been disconected");
  });
});

export { httpServer, Io };
