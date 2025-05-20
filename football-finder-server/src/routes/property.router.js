import { Router } from "express";
const router = Router()

import PropertyService from "../services/property.service.js";

import { verifyToken, authorize } from "../middlewares/authorization.middlewares.js";


//LISTA PREDIOS
router.get('/', verifyToken, authorize('player'),PropertyService.getPropertys)
router.get('/:pid/games',verifyToken, authorize('admin') ,PropertyService.getGamesByProperty)


router.post("/newproperty",verifyToken, authorize('admin') ,PropertyService.postProperty)
//solo el admin dueño del predio
router.post("/:rid/acepted",verifyToken, authorize('admin'), PropertyService.postAceptReservation)


router.delete("/:pid", verifyToken, authorize('admin'),PropertyService.deleteProperty)


export default router