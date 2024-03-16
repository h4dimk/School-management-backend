import mongoose, { Model, Schema } from "mongoose";

import { IBatch } from "../../../entities/batchEntity";

const batchSchema: Schema<IBatch> = new Schema({
  batch: {
    type: String,
  },
});

const batchModel: Model<IBatch> = mongoose.model("batch", batchSchema);

export default batchModel;
