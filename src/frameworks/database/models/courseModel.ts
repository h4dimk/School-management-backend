import mongoose, { Schema, Model } from "mongoose";

import { ICourse } from "../../../entities/courseEntity";

const courseSchema: Schema<ICourse> = new Schema({
  course: {
    type: String,
    required: true,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const courseModel: Model<ICourse> = mongoose.model("course", courseSchema);
export default courseModel;
