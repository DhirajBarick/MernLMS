const Course = require("../models/Course");
const User = require("../models/User");

// Create a new course (admin only)
exports.createCourse = async (req, res) => {
  try {
    const course = new Course({ ...req.body, createdBy: req.user.id });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all courses (any logged-in user)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Enroll logged-in user in a course
exports.enroll = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const user = await User.findById(req.user.id);
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }
    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update course by ID (admin only, only creator can update)
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updates = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this course" });
    }

    Object.assign(course, updates);
    await course.save();

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete course by ID (admin only, only creator can delete)
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this course" });
    }

    await course.remove();

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
