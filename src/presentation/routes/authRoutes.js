const express = require("express");

const AuthController = require("../controllers/AuthController");

const createAuthRoutes = (coreModule) => {
  const router = express.Router();

  const authController = new AuthController(coreModule);

  router.post("/register", authController.register);
  router.post("/login", authController.login);

  return router;
};

module.exports = createAuthRoutes;