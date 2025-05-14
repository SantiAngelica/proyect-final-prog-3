import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey = 'programacion-footbal-finder'


export const generatePassword = async (pass) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass, salt)
    return hashedPassword
}

export const comparePassword = async (pass, userPass) => {
    return await bcrypt.compare(pass, userPass)
}

export const generateToken = (email, role) => {
    console.log(role)
    return jwt.sign({ email, role }, secretKey, { expiresIn: '1h' })
}

