const express = require("express");
const { addComment, getComments, deleteComment } = require("../controllers/commentController");
const { authenticate } = require("../middleware/authMiddleware");

const commentRouter = express.Router();

commentRouter.post("/:productId/comments", authenticate, addComment);
commentRouter.get("/:productId/comments", getComments);
commentRouter.delete("/:productId/comments/:commentId", authenticate, deleteComment);

module.exports = commentRouter; 