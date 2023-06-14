const { getById } = require("../users/users-model.js");

function logger(req, res, next) {
  console.log(req.method, req.originalUrl, Date.now());
  next();
}

async function validateUserId(req, res, next) {
  try {
    let user = await getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({ status: 404, message: "kullanıcı not found" });
    }
  } catch (e) {
    next(e);
  }
}

function validateUser(req, res, next) {
  req.body.name ? next() : next({ status: 400, message: "gerekli name alanı eksik" });
}

async function validatePost(req, res, next) {
  req.body.text ? next() : next({ status: 400, message: "gerekli text alanı eksik" });
}

function errHandler(err, req, res, next) {
  res.headersSent ? next(err) : res.status(err.status || 500).json({ message: err.message || "internal server error." });
}

module.exports = { logger, validateUserId, validateUser, validatePost, errHandler };
