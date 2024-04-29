import mongoose, { Model, Schema } from "mongoose";
import { IGroup } from "../../../entities/groupEntity";

const groupSchema: Schema<IGroup> = new Schema({
  batchId: {
    type: Schema.Types.ObjectId,
    ref: "batch",
  },
  members: [{ type: Schema.Types.ObjectId, ref: "Student" || "Teacher" }],
});

const groupModel: Model<IGroup> = mongoose.model("Group", groupSchema);

export default groupModel;
