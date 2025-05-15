const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const validatePassword = (password) => {
    if (password.length < 8) {
        return false;
    } else if (!/[A-Z]/.test(password)) {
        return false;
    } else if (!/[0-9]/.test(password)) {
        return false;
    }
    return true;
}

export const validateUser = (req) => {
    const result = {
        error: false,
        message: ''
    }

    const { email, password } = req

    if (!email || !validateEmail(email)) {
        result.error = true
        result.message = 'invalid email'
    }
    if (!password || !validatePassword(password)) {
        result.error = true
        result.message = 'invalid password'
    }
    return result
}

const roleOrder = {
    superadmin: 3,
    admin: 2,
    player: 1
}
export const validateRoleAndId = (user, requiredId, onlyId, requiredRole) => {
    if (onlyId) return user.id == requiredId

    const hasrole = roleOrder[user.role] >= roleOrder[requiredRole]
    const isowner = user.id == requiredId

    return hasrole ||isowner
}