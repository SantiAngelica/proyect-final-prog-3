import { Router } from "express";
const router = Router()

import PropertyService from "../services/property.service.js";

import { verifyToken, authorize } from "../middlewares/authorization.middlewares.js";


//LISTA PREDIOS
router.get('/', verifyToken, authorize('player'),PropertyService.getPropertys)
router.get('/:pid/games',verifyToken, authorize('admin') ,PropertyService.getGamesByProperty)


//solo el admin dueño del predio
router.post("/:rid/acepted",verifyToken, authorize('admin'), PropertyService.postAceptReservation)


export default router