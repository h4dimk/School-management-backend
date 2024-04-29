import { IMessage } from "../../../../entities/chatEntity";
import chatModel from "../../models/chatModel";

export const createMessage = async (messageData: IMessage) => {
  try {
    const createdMessage = await chatModel.create(messageData);
    return createdMessage;
  } catch (error) {
    console.error("Error creating Leave:", error);
    throw new Error("Failed to create Leave");
  }
};

export const findChats = async (batchId: string) => {
  try {
    const chats = await chatModel.find({ group: batchId }).populate("sender");
    return chats;
  } catch (error) {
    console.error("Error finding chats in groups:", error);
    throw new Error("Failed to find chats in groups");
  }
};
