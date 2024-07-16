import { httpServer } from "./frameworks/webserver/config/socket";
import connectDB from "./frameworks/webserver/config/db";
import cron from "node-cron";
import axios from "axios";

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const SERVER = process.env.SERVER || `http://localhost:${process.env.PORT}`;

const start = () => {
  httpServer.listen(PORT, () => {
    console.log(
      `server has been connected on http://localhost:${process.env.PORT}`
    );
    connectDB();
  });

  // Cron job to send request every 2 minutes
  cron.schedule("*/2 * * * *", () => {
    axios
      .get(SERVER)
      .then((response) => {
        console.log(`Request sent successfully at ${new Date()}`);
      })
      .catch((error) => {
        console.error(`Error sending request: ${error.message}`);
      });
  });
};

start();
