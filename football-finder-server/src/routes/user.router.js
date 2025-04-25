import { Router } from "express";
const router = Router()
import UserService from "../services/user.service.js";

router.get("/", UserService.getUsers)
router.get("/:id", UserService.getUserById)

router.post("/", UserService.postUser)

export default router