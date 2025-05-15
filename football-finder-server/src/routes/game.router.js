import { Router } from "express";
const router = Router()
import GameService from "../services/game.service.js";

import { verifyToken, authorize } from "../middlewares/authorization.middlewares.js";


router.get("/availables", verifyToken, authorize('player'), GameService.getAvailablesGames)
router.get("/:gid",verifyToken, authorize('player'), GameService.getGameById)


router.post("/",verifyToken, authorize('player'), GameService.postGame)

//verificar que el si el rol es player, que sea el id del creador de juego
router.delete("/:gid", verifyToken, authorize('player'),GameService.deleteGame)



export default router