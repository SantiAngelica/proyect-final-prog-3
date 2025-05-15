import { Router } from "express";
const router = Router()
import UserService from "../services/user.service.js";
import { verifyToken, authorize } from "../middlewares/authorization.middlewares.js";

router.get("/",verifyToken, authorize('player') ,UserService.getUsers)
router.get("/:id", verifyToken, authorize('player'),UserService.getUserById)
router.get("/:id/my-games", verifyToken, authorize('player'),UserService.getGamesByUserCreator)
router.get("/:id/play-in", verifyToken, authorize('player'),UserService.getGamesByUserParticipant)


router.post("/comment/:rid/:sid", verifyToken, authorize('player'),UserService.postComent)

//si el rol es player, verificar que sea el mismo jugador que se esta borrando
router.delete("/:id",verifyToken, authorize('player'), UserService.deleteUser)


router.delete("/comment/:cid",verifyToken, authorize('admin'),UserService.deleteComent)


//si el rol es player, verificar que sea el mismo jugador que se esta actualizando
router.put("/:id", verifyToken, authorize('player'),UserService.updateUser)


router.put('/rolechange/:id', verifyToken, authorize('superadmin'),UserService.updateUserRol)



export default router