import { Router } from "express";
const router = Router()
import UserService from "../services/user.service.js";

router.get("/", UserService.getUsers)
router.get("/:id", UserService.getUserById)


router.post("/comment/:id", UserService.postComent)


router.delete("/:id", UserService.deleteUser)
router.delete("/comment/:cid", UserService.deleteComent)

router.put("/:id", UserService.updateUser)
router.put('/rolechange/:id', UserService.updateUserRol)



export default router