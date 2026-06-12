import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      default: ""
    },

    date: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: "Draft"
    }
  },
  {
    timestamps: true
  }
);

const Blog =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;