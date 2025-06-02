const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const { createCourse, getAllCourses, enroll } = require("../controllers/courseController");

router.get("/", auth, getAllCourses);
router.post("/", auth, roleCheck("admin"), createCourse);
router.post("/:courseId/enroll", auth, enroll);

module.exports = router; 
