const express = require("express");
const { validateUserId, validatePost } = require("../middleware/middleware.js");
const { insert } = require("./posts-model.js");
const { getUserPosts } = require("../users/users-model.js");

const router = express.Router({ mergeParams: true });

router.get("/posts", validateUserId, async (req, res, next) => {
  try {
    let query = await getUserPosts(req.user.id);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.post("/posts", validateUserId, validatePost, async (req, res, next) => {
  try {
    let query = await insert({ user_id: req.params.id, text: req.body.text });
    res.status(201).json(query);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
