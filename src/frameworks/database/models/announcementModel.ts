import mongoose, { Schema, Model } from "mongoose";
import { IAnnouncement } from "../../../entities/announcementEntity";

const announcementSchema: Schema<IAnnouncement> = new Schema({
  announcement: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const announcementModel: Model<IAnnouncement> = mongoose.model(
  "Announcement",
  announcementSchema
);

export default announcementModel;
