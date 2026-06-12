import { connectDB } from "$lib/server/db.js";
import Member from "$lib/server/models/member.js";
import Project from "$lib/server/models/project.js";
import Blog from "$lib/server/models/blogs.js";

export const load = async () => {
  await connectDB();

  const totalMembers = await Member.countDocuments();
  const totalProjects = await Project.countDocuments();
  const totalBlogs = await Blog.countDocuments();
  const draftBlogs = await Blog.countDocuments({ status: "Draft" });

  return {
    stats: {
      totalMembers,
      totalProjects,
      totalBlogs,
      draftBlogs
    }
  };
};