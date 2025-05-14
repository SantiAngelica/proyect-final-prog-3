import { Router } from "express";
const router = Router()
import GameService from "../services/game.service.js";
import { Game } from "../model/index.model.js";

router.get("/availables", GameService.getAvailablesGames)
router.get("/:gid", GameService.getGameById)
router.get("/applications/:uid", GameService.getApplicationsByUserId)
router.get("/invitations/:uid", GameService.getInvitationsByUserId)

router.post("/", GameService.postGame)
router.post("/acepted/:rid", GameService.postAceptReservation)
router.post("/invitation/:gameId/:recieverId", GameService.postInvitation)
router.post("/application/:gameId/:applicantId", GameService.postApplication)
router.post("/acepted-invitation/:id", GameService.postAceptInvitation)
router.post("/acepted-application/:id", GameService.postAceptApplication)

router.delete("/:gid", GameService.deleteGame)



export default router