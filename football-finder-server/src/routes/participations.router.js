import { Router } from "express";
const router = Router()

import ParticipationService from "../services/participations.service.js";
import { verifyToken, authorize } from "../middlewares/authorization.middlewares.js";

router.get("/my-applications",verifyToken, authorize('player'), ParticipationService.getApplicationsByUserId)
router.get("/my-invitations",verifyToken, authorize('player'), ParticipationService.getInvitationsByUserId)

//verificar que solo si es el creador del juego
router.post("/invitation/:gameId/:recieverId",verifyToken, authorize('player'), ParticipationService.postInvitation)
//verificar que solo si es el postulante
router.post("/application/:gameId",verifyToken, authorize('player'), ParticipationService.postApplication)

//solo si es el que fue invitado
router.post("/acepted-invitation/:id",verifyToken, authorize('player'), ParticipationService.postAceptInvitation)
//solo si es el dueño del partido
router.post("/acepted-application/:id",verifyToken, authorize('player'), ParticipationService.postAceptApplication)

export default router