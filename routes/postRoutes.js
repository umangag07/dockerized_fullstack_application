const postController = require("../controllers/postController");
const express = require("express");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(auth,postController.getAllPost)
  .post(auth ,postController.createPost);
router
  .route("/:id")
  .get(auth,postController.getOnePost)
  .patch(auth,postController.patchPost)
  .delete(auth,postController.deletePost);

module.exports = router;
