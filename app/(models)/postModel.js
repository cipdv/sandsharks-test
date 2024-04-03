import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const postRepliesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  // image: {
  //     type: String
  // }
});

const beginnerClinicSchema = new Schema({
  beginnerClinicOffered: {
    type: Boolean,
    default: false,
  },
  beginnerClinicStartTime: {
    type: String,
  },
  beginnerClinicEndTime: {
    type: String,
  },
});

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    date: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    beginnerClinic: beginnerClinicSchema,
    replies: [postRepliesSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
