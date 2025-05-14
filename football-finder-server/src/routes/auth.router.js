import { Router } from "express";
const router = Router()
import AuthService from "../services/auth.service.js";


router.post('/register', AuthService.register)
router.post('/login', AuthService.login)


export default router