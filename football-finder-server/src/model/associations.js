import { User } from "./user/user.model.js";
import { UserComent } from "./user/userComent.model.js";
import { UserField } from "./user/userTypeField.model.js";

export const userAssociations = () => {
    //DECLARO FK DE COMENTARIOR REFERENCIA A USUARIOS
    UserComent.belongsTo(User, {foreignKey: 'user_id'})
    User.hasMany(UserComent, {foreignKey: 'user_id'})

    //DECLARO FK DE TIPO CANCHAS REFERENCIA A USUARIOS
    UserField.belongsTo(User, {foreignKey: 'user_id'})
    User.hasMany(UserField, {foreignKey: 'user_id'})
}