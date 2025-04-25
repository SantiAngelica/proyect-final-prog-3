import { User } from "./user/user.model.js";
import { UserComent } from "./user/userComent.model.js";
import { UserField } from "./user/userTypeField.model.js";
import { UserPosition } from "./user/userPosition.model.js";

import { Game } from "./game/game.model.js";
import { GameApplication } from "./game/gameApplication.model.js";
import { GameInvitation } from "./game/gameInvitation.model.js";

import { Property } from "./property/property.model.js";
import { PropertyTypeField } from "./property/propertyTypeField.model.js";



export const userAssociations = () => {
    //DECLARO FK DE COMENTARIOR REFERENCIA A USUARIOS
    UserComent.belongsTo(User, { foreignKey: 'user_id' })
    User.hasMany(UserComent, { foreignKey: 'user_id' })

    //DECLARO FK DE TIPO CANCHAS REFERENCIA A USUARIOS
    UserField.belongsTo(User, { foreignKey: 'user_id' })
    User.hasMany(UserField, { foreignKey: 'user_id' })

    //DECLARO FK DE POSICIONES REFERENCIA A USUARIOS
    UserPosition.belongsTo(User, { foreignKey: 'user_id' })
    User.hasMany(UserPosition, { foreignKey: 'user_id' })

    //DECLARO FK ID DEL USUARIO RECEPTOR DE LA INVITACION
    GameInvitation.belongsTo(User, { foreignKey: 'id_user_reciever' })
    User.hasMany(GameInvitation, { foreignKey: 'id_user_reciever' })

    //DECLARO FK ID DEL USUARIO APLICANTE A UN PARTIDO
    GameApplication.belongsTo(User, { foreignKey: 'id_user_applicant' })
    User.hasMany(GameApplication, { foreignKey: 'id_user_applicant' })
}

export const gameAssociations = () => {
    //DECLARO FK ID DEL USUARIO CREADOR DEL PARTIDO
    Game.belongsTo(User, { foreignKey: 'id_user_creator' })
    User.hasMany(Game, { foreignKey: 'id_user_creator' })

    //DECLARO FK DEL PARTIDO AL QUE UN USUARIO SOLICITA
    GameApplication.belongsTo(Game, { foreignKey: 'id_game' })
    Game.hasMany(GameApplication, { foreignKey: 'id_game' })

    //DECLARO FK DEL PARTIDO AL QUE UN USUARIO ES INVITADO
    GameInvitation.belongsTo(Game, { foreignKey: 'id_game' })
    Game.hasMany(GameInvitation, { foreignKey: 'id_game' })

    //DECLARO FK DEL PREDIO EN DONDE SE JUEGA EL PARTIDO
    Game.belongsTo(Property, { foreignKey: 'id_property' })
    Property.hasMany(Game, { foreignKey: 'id_property' })
}

export const propertyAssociations = () => {
    //DECLARO FK DEL TIPO DE CANCHA
    PropertyTypeField.belongsTo(Property, { foreignKey: 'id_property' })
    Property.hasMany(PropertyTypeField, { foreignKey: 'id_property' })
}

export const associations = () => {
    userAssociations()
    gameAssociations()
    propertyAssociations()
}