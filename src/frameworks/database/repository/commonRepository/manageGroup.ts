import { Types } from "mongoose";
import { IGroup } from "../../../../entities/groupEntity";
import groupModel from "../../models/groupModel";

export const createGroup = async (groupData: IGroup) => {
  try {
    const createdGroup = await groupModel.create(groupData);
    return createdGroup;
  } catch (error) {
    console.error("Error creating Group:", error);
    throw new Error("Failed to create Group");
  }
};

export const findGroup = async (batchId: string) => {
  try {
    const group = await groupModel.findOne({ batchId });
    return group;
  } catch (error) {
    console.error("Error finding Group:", error);
    throw new Error("Failed to find Group");
  }
};

export const addMemberToGroup = async (
  groupId: string,
  memberId: Types.ObjectId
) => {
  try {
    const group = await groupModel.findById(groupId);
    if (!group) {
      throw new Error("Group not found");
    }

    group.members.push(memberId);

    const updatedGroup = await group.save();

    return updatedGroup;
  } catch (error) {
    console.error("Error adding member to group:", error);
    throw new Error("Failed to add member to group");
  }
};
