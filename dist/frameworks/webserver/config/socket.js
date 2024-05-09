"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Io = exports.httpServer = void 0;
const socket_io_1 = require("socket.io");
const app_1 = require("./app");
const http_1 = require("http");
const httpServer = (0, http_1.createServer)(app_1.app);
exports.httpServer = httpServer;
const Io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CLIENT,
    },
});
exports.Io = Io;
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
//# sourceMappingURL=socket.js.map