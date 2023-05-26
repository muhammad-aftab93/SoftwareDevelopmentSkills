const express = require("express");
const mongodb = require("../database/mongodb");
const jwt = require("jsonwebtoken");
const router = express.Router();
const configs = require("../constants/configs");
const verifyToken = require("../middlewares/jwtMiddleware");
const { ObjectId } = require("mongodb");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/", async (req, res) => {
  const course = req.body;

  try {
    const db = mongodb.getDB();
    const coursesCollection = db.collection("courses");
    const courses = await coursesCollection.find().toArray();
    res
      .status(200)
      .json({ status: true, message: "list of courses", courses: courses });
  } catch (error) {
    console.error("Error getting course", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", verifyToken, authorizeRole("admin"), async (req, res) => {
  const course = req.body;

  try {
    const db = mongodb.getDB();
    const coursesCollection = db.collection("courses");
    const result = await coursesCollection.insertOne(course);
    res
      .status(201)
      .json({
        status: true,
        message: "Course created",
        courseId: result.insertedId,
      });
  } catch (error) {
    console.error("Error creating course", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", verifyToken, authorizeRole("admin"), async (req, res) => {
  const courseId = req.params.id;

  try {
    const db = mongodb.getDB();
    const coursesCollection = db.collection("courses");
    const result = await coursesCollection.deleteOne({
      _id: new ObjectId(courseId),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Course not found" });

    const userCoursesCollection = db.collection("user_courses");
    await userCoursesCollection.deleteMany({
      courseId: courseId,
    });

    res.json({ status: true, message: "Course deleted" });
  } catch (error) {
    console.error("Error deleting course", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/search", async (req, res) => {
  const { title, author, category } = req.body;

  const query = {};

  if (title)
    query.title = { $regex: title, $options: "i" };

  if (author)
    query.author = { $regex: author, $options: "i" };

  if (category)
    query.category = { $regex: category, $options: "i" };

  try {
    const db = mongodb.getDB();
    const coursesCollection = db.collection("courses");
    const results = await coursesCollection.find(query).toArray();

    res.json({ status: true, message: "Ok", courses: results });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while searching." });
  }
});

router.post("/enroll", verifyToken, authorizeRole("user"), async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const db = mongodb.getDB();
    const userCoursesCollection = db.collection('user_courses');
    const entity = {
      userId,
      courseId,
      completed: false
    };
    const existingEntity = await userCoursesCollection.findOne(entity);
    if (existingEntity) {
        return res.status(409).json({error: 'You have already enrolled in this course.'});
    }
    const result = await userCoursesCollection.insertOne(entity);

    res.json({ status: true, message: "Course enrolled successfully.", _id: result.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while enrolling the course." });
  }
});

router.get("/ongoing/:userId", verifyToken, authorizeRole("user"), async (req, res) => {
  const userId = req.params.userId;

  try {
    const db = mongodb.getDB();
    const userCoursesCollection = db.collection("user_courses");
    const coursesCollection = db.collection("courses");

    const enrolledCourses = await userCoursesCollection
      .find({
        userId: userId,
        completed: false,
      })
      .toArray();

    const courseIds = enrolledCourses.map((course) => course.courseId);
    const enrolledCourseDetails = await coursesCollection
        .find({ _id: { $in: courseIds.map((id) => new ObjectId(id)) } })
        .toArray();

    res.json({
      status: true,
      message: "Enrolled courses retrieved successfully.",
      courses: enrolledCourseDetails,
    });
  } catch (error) {
    console.error("Error retrieving enrolled courses", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/completed/:userId", verifyToken, authorizeRole("user"), async (req, res) => {
  const userId = req.params.userId;

  try {
    const db = mongodb.getDB();
    const userCoursesCollection = db.collection("user_courses");
    const coursesCollection = db.collection("courses");

    const completedCourses = await userCoursesCollection
      .find({
        userId: userId,
        completed: true,
      })
      .toArray();

    const courseIds = completedCourses.map((course) => course.courseId);
    const completedCourseDetails = await coursesCollection
        .find({ _id: { $in: courseIds.map((id) => new ObjectId(id)) } })
        .toArray();

    res.json({
      status: true,
      message: "Completed courses retrieved successfully.",
      courses: completedCourseDetails,
    });
  } catch (error) {
    console.error("Error retrieving completed courses", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/markAsComplete", verifyToken, authorizeRole("user"), async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const db = mongodb.getDB();
    const userCoursesCollection = db.collection("user_courses");

    await userCoursesCollection.updateOne(
      { userId: userId, courseId: courseId },
      { $set: { completed: true } }
    );

    res.json({
      status: true,
      message: "Course marked as completed.",
    });
  } catch (error) {
    console.error("Failed to mark course as completed.", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/withdraw", verifyToken, authorizeRole("user"), async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const db = mongodb.getDB();
    const userCoursesCollection = db.collection("user_courses");

    await userCoursesCollection.deleteOne({
      userId: userId,
      courseId: courseId
    });

    res.json({
      status: true,
      message: "Course with-drawl successful.",
    });
  } catch (error) {
    console.error("Failed to with-draw the course.", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
