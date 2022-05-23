const userController = require("../controllers/userController");
const express = require("express");
const Router = express.Router();

Router.route("/")
  .get(userController.findAllUsers)
Router.route("/signup")
  .post(userController.createUser);
Router.route("/login")
  .post(userController.login);
Router.route("/email").post(userController.findUserByEmail);
Router.route("/:id")
  .get(userController.findSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
