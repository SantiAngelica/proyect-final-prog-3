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
    UserComent.belongsTo(User, { foreignKey: 'user_id', as: 'reciever', onDelete: 'CASCADE' })
    User.hasMany(UserComent, { foreignKey: 'user_id', as: 'comments', onDelete: 'CASCADE' })

    //DECLARO FK DE TIPO CANCHAS REFERENCIA A USUARIOS
    UserField.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE'})
    User.hasMany(UserField, { foreignKey: 'user_id', as:'fieldsType' , onDelete: 'CASCADE'})

    //DECLARO FK DE POSICIONES REFERENCIA A USUARIOS
    UserPosition.belongsTo(User, { foreignKey: 'user_id', as: 'user' , onDelete: 'CASCADE'})
    User.hasMany(UserPosition, { foreignKey: 'user_id', as: 'positions', onDelete: 'CASCADE' })

    //DECLARO FK ID DEL USUARIO RECEPTOR DE LA INVITACION
    GameInvitation.belongsTo(User, { foreignKey: 'id_user_reciever', as:'invitationReciever' , onDelete: 'CASCADE'})
    User.hasMany(GameInvitation, { foreignKey: 'id_user_reciever', as:'invitations', onDelete: 'CASCADE'})

    //DECLARO FK ID DEL USUARIO APLICANTE A UN PARTIDO
    GameApplication.belongsTo(User, { foreignKey: 'id_user_applicant', as:'userApplicant' , onDelete: 'CASCADE'})
    User.hasMany(GameApplication, { foreignKey: 'id_user_applicant', as:'userApplications' , onDelete: 'CASCADE'})

    //DECLARO FK ID DEL USUARIO QUE JUEGA UN PARTIDO
    GameUser.belongsTo(User, { foreignKey: 'id_user', as:'player', onDelete: 'CASCADE' })
    User.hasMany(GameUser, { foreignKey: 'id_user', as:'gameParticipations' , onDelete: 'CASCADE'})
}

export const gameAssociations = () => {
    //DECLARO FK ID DEL USUARIO CREADOR DEL PARTIDO
    Game.belongsTo(User, { foreignKey: 'id_user_creator', as:'userCreator' , onDelete: 'CASCADE'})
    User.hasMany(Game, { foreignKey: 'id_user_creator', as:'createdGames', onDelete: 'CASCADE' })

    //DECLARO FK DEL PARTIDO AL QUE UN USUARIO SOLICITA
    GameApplication.belongsTo(Game, { foreignKey: 'id_game', as:'gameApplied', onDelete: 'CASCADE' })
    Game.hasMany(GameApplication, { foreignKey: 'id_game', as: 'gameApplications' , onDelete: 'CASCADE'})

    //DECLARO FK DEL PARTIDO AL QUE UN USUARIO ES INVITADO
    GameInvitation.belongsTo(Game, { foreignKey: 'id_game', as:'gameInvited', onDelete: 'CASCADE' })
    Game.hasMany(GameInvitation, { foreignKey: 'id_game', as:'gameInvitations', onDelete: 'CASCADE' })

    //DECLARO FK ID DEL PARTIDO EN EL QUE JUEGA UN USUARIO
    GameUser.belongsTo(Game, { foreignKey: 'id_game', as:'game' , onDelete: 'CASCADE'})
    Game.hasMany(GameUser, { foreignKey: 'id_game', as:'players'  , onDelete: 'CASCADE'})

    //DECLARO FK DEL PARTIDO AL QUE PERTENECE UNA RESERVA
    Reservation.belongsTo(Game, { foreignKey: 'id_game', as:'game', onDelete: 'CASCADE'})
    Game.hasOne(Reservation, { foreignKey: 'id_game', as:'reservation', onDelete: 'CASCADE' })
}

export const propertyAssociations = () => {
    Property.belongsTo(User, { foreignKey: 'id_user_owner', as:'owner', onDelete: 'CASCADE' })
    User.hasMany(Property, { foreignKey: 'id_user_owner', as:'properties', onDelete: 'CASCADE' })

    //DECLARO FK DEL TIPO DE CANCHA
    PropertyTypeField.belongsTo(Property, { foreignKey: 'id_property', as:'property' , onDelete: 'CASCADE'})
    Property.hasMany(PropertyTypeField, { foreignKey: 'id_property', as:'fields' , onDelete: 'CASCADE'})

    //DECLARO FK DEL PREDIO AL QUE PERTENCE CADA HORARIO
    ScheduleProperty.belongsTo(Property, { foreignKey: 'id_property', as: 'property', onDelete: 'CASCADE' })
    Property.hasMany(ScheduleProperty, { foreignKey: 'id_property', as: 'schedules' , onDelete: 'CASCADE'})

    //DECLARO FK DEL TIPO DE CANCHA EN DONDE SE HACE LA RESERVA
    Reservation.belongsTo(PropertyTypeField, { foreignKey: 'id_field', as:'fieldType' , onDelete: 'CASCADE'})
    PropertyTypeField.hasMany(Reservation, { foreignKey: 'id_field', as:'reservations' , onDelete: 'CASCADE'})

    //DECLARO FK DEL HORARIO EN EL QUE SE HACE LA RESERVA
    Reservation.belongsTo(ScheduleProperty, { foreignKey: 'id_schedule', as:'schedule', onDelete: 'CASCADE' })
    ScheduleProperty.hasMany(Reservation, { foreignKey: 'id_schedule', as:'reservations', onDelete: 'CASCADE' })
}

export const associations = () => {
    userAssociations()
    gameAssociations()
    propertyAssociations()
}