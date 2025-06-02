const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: {
    videos: [String],
    documents: [String],
    images: [String]
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("Course", courseSchema); 
