const postController = require("../controllers/postController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(postController.getAllPost)
  .post(postController.createPost);
router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(postController.patchPost)
  .delete(postController.deletePost);

module.exports = router;
