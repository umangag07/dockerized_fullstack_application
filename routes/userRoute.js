const userController = require("../controllers/userController");
const express = require("express");
const Router = express.Router();
const { auth } = require("../middleware/authMiddleware");


Router.route("/")
  .get(auth,userController.findAllUsers)
Router.route("/signup")
  .post(userController.createUser);
Router.route("/login")
  .post(userController.login);
Router.route("/email").post(auth,userController.findUserByEmail);
Router.route("/:id")
  .get(auth,userController.findSingleUser)
  .patch(auth,userController.updateUser)
  .delete(auth,userController.deleteUser);

module.exports = Router;
