import { httpServer } from "./frameworks/webserver/config/socket";
import connectDB from "./frameworks/webserver/config/db";
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const start = () => {
  httpServer.listen(PORT, () => {
    console.log(
      `server has been connected on http://localhost:${process.env.PORT}`
    );
    connectDB();
  });
};

start();
