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

module.exports = router;
