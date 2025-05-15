import { User } from "./user/user.model.js";
import { UserComent } from "./user/userComent.model.js";
import { UserField } from "./user/userTypeField.model.js";
import { UserPosition } from "./user/userPosition.model.js";

import { Game } from "./game/game.model.js";
import { GameApplication } from "./game/gameApplication.model.js";
import { GameInvitation } from "./game/gameInvitation.model.js";
import { GameUser } from "./game/gameUser.js";
import { Reservation } from "./game/reservation.model.js";

import { Property } from "./property/property.model.js";
import { PropertyTypeField } from "./property/propertyTypeField.model.js";
import { ScheduleProperty } from "./property/scheduleProperty.js";



export const userAssociations = () => {
    //DECLARO FK DE COMENTARIOR REFERENCIA A USUARIOS
    UserComent.belongsTo(User, { foreignKey: 'user_id', as: 'reciever'})
    User.hasMany(UserComent, { foreignKey: 'user_id', as: 'comments'})

    //DECLARO FK DE TIPO CANCHAS REFERENCIA A USUARIOS
    UserField.belongsTo(User, { foreignKey: 'user_id', as: 'user'})
    User.hasMany(UserField, { foreignKey: 'user_id', as:'fieldsType' })

    //DECLARO FK DE POSICIONES REFERENCIA A USUARIOS
    UserPosition.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
    User.hasMany(UserPosition, { foreignKey: 'user_id', as: 'positions' })

    //DECLARO FK ID DEL USUARIO RECEPTOR DE LA INVITACION
    GameInvitation.belongsTo(User, { foreignKey: 'id_user_reciever', as:'invitationReciever' })
    User.hasMany(GameInvitation, { foreignKey: 'id_user_reciever', as:'invitations'})

    //DECLARO FK ID DEL USUARIO APLICANTE A UN PARTIDO
    GameApplication.belongsTo(User, { foreignKey: 'id_user_applicant', as:'userApplicant' })
    User.hasMany(GameApplication, { foreignKey: 'id_user_applicant', as:'userApplications' })

    //DECLARO FK ID DEL USUARIO QUE JUEGA UN PARTIDO
    GameUser.belongsTo(User, { foreignKey: 'id_user', as:'player' })
    User.hasMany(GameUser, { foreignKey: 'id_user', as:'gameParticipations' })
}

export const gameAssociations = () => {
    //DECLARO FK ID DEL USUARIO CREADOR DEL PARTIDO
    Game.belongsTo(User, { foreignKey: 'id_user_creator', as:'userCreator' })
    User.hasMany(Game, { foreignKey: 'id_user_creator', as:'createdGames' })

    //DECLARO FK DEL PARTIDO AL QUE UN USUARIO SOLICITA
    GameApplication.belongsTo(Game, { foreignKey: 'id_game', as:'gameApplied' })
    Game.hasMany(GameApplication, { foreignKey: 'id_game', as: 'gameApplications' })

    //DECLARO FK DEL PARTIDO AL QUE UN USUARIO ES INVITADO
    GameInvitation.belongsTo(Game, { foreignKey: 'id_game', as:'gameInvited' })
    Game.hasMany(GameInvitation, { foreignKey: 'id_game', as:'gameInvitations' })

    //DECLARO FK ID DEL PARTIDO EN EL QUE JUEGA UN USUARIO
    GameUser.belongsTo(Game, { foreignKey: 'id_game', as:'game' })
    Game.hasMany(GameUser, { foreignKey: 'id_game', as:'players'  })

    //DECLARO FK DEL PARTIDO AL QUE PERTENECE UNA RESERVA
    Reservation.belongsTo(Game, { foreignKey: 'id_game', as:'game'})
    Game.hasOne(Reservation, { foreignKey: 'id_game', as:'reservation' })
}

export const propertyAssociations = () => {
    Property.belongsTo(User, { foreignKey: 'id_user_owner', as:'owner' })
    User.hasMany(Property, { foreignKey: 'id_user_owner', as:'properties' })

    //DECLARO FK DEL TIPO DE CANCHA
    PropertyTypeField.belongsTo(Property, { foreignKey: 'id_property', as:'property' })
    Property.hasMany(PropertyTypeField, { foreignKey: 'id_property', as:'fields' })

    //DECLARO FK DEL PREDIO AL QUE PERTENCE CADA HORARIO
    ScheduleProperty.belongsTo(Property, { foreignKey: 'id_property', as: 'property' })
    Property.hasMany(ScheduleProperty, { foreignKey: 'id_property', as: 'schedules' })

    //DECLARO FK DEL TIPO DE CANCHA EN DONDE SE HACE LA RESERVA
    Reservation.belongsTo(PropertyTypeField, { foreignKey: 'id_field', as:'fieldType' })
    PropertyTypeField.hasMany(Reservation, { foreignKey: 'id_field', as:'reservations' })

    //DECLARO FK DEL HORARIO EN EL QUE SE HACE LA RESERVA
    Reservation.belongsTo(ScheduleProperty, { foreignKey: 'id_schedule', as:'schedule' })
    ScheduleProperty.hasMany(Reservation, { foreignKey: 'id_schedule', as:'reservations' })
}

export const associations = () => {
    userAssociations()
    gameAssociations()
    propertyAssociations()
}