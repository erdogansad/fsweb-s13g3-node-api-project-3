const express = require("express");
const server = express();
const { logger, errHandler } = require("./middleware/middleware.js");
const users = require("./users/users-router.js");

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => res.send(`<h2>Biraz ara yazılım yazalım!</h2>`));
server.use("/api/users", users);

server.use(errHandler);
module.exports = server;
