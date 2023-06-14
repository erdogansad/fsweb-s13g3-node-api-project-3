const express = require("express");
const { get, insert, update, remove } = require("./users-model.js");
const { validateUserId, validateUser } = require("../middleware/middleware.js");
const posts = require("../posts/posts-router.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let query = await get();
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser, async (req, res, next) => {
  try {
    let query = await insert(req.body);
    res.status(201).json(query);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
  try {
    let query = await update(req.params.id, req.body);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  try {
    let query = await remove(req.params.id);
    res.status(200).json(req.user);
  } catch (e) {
    next(e);
  }
});

router.use("/:id", posts);

module.exports = router;
