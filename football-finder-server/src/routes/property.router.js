import { Router } from "express";
const router = Router()

import PropertyService from "../services/property.service.js";


//LISTA PREDIOS
router.get('/', PropertyService.getPropertys)
router.get('/:gid/games', PropertyService.getGamesByProperty)


export default router