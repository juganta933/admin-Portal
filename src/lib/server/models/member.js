import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      default: ""
    },

    linkedin: {
      type: String,
      default: ""
    },

    github: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Member =
  mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;