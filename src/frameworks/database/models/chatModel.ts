import mongoose, { Model, Schema } from "mongoose";
import { IMessage } from "../../../entities/chatEntity";

const chatSchema: Schema<IMessage> = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },
  },
  { timestamps: true }
);

const chatModel: Model<IMessage> = mongoose.model("Chat", chatSchema);

export default chatModel;
