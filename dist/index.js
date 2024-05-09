"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./frameworks/webserver/config/socket");
const db_1 = __importDefault(require("./frameworks/webserver/config/db"));
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const start = () => {
    socket_1.httpServer.listen(PORT, () => {
        console.log(`server has been connected on http://localhost:${process.env.PORT}`);
        (0, db_1.default)();
    });
};
start();
//# sourceMappingURL=index.js.map