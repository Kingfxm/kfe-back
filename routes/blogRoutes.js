const express = require("express");
const { createEntry, getEntries, getMiniBlogEntries, getBlogById } = require("../controllers/blogController.js");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getEntries);
router.get("/mini", getMiniBlogEntries);
router.get("/:id", getBlogById);
router.post("/", verifyToken, createEntry);

module.exports = router;
