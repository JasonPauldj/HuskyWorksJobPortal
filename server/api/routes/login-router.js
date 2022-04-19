import express from "express";
import * as LoginController from "../controllers/login-controller.js";

const router = express.Router();

router
  .route("/login") 
  .post(LoginController.login); 
 
  export default router;