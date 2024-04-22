import mongoose, { Model, Schema } from "mongoose";

import { IBatch } from "../../../entities/batchEntity";

const batchSchema: Schema<IBatch> = new Schema({
  name: {
    type: String,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const batchModel: Model<IBatch> = mongoose.model("batch", batchSchema);

export default batchModel;
