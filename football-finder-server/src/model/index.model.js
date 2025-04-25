import { User } from "./user/user.model.js";
import { UserComent } from "./user/userComent.model.js";
import { UserField } from "./user/userTypeField.model.js";
import { UserPosition } from "./user/userPosition.model.js";

import { Game } from "./game/game.model.js";
import { GameApplication } from "./game/gameApplication.model.js";
import { GameInvitation } from "./game/gameInvitation.model.js";

import { Property } from "./property/property.model.js";
import { PropertyTypeField } from "./property/propertyTypeField.model.js";

import { associations } from "./associations.js";
import { sequelize } from "../db.js";

associations();

export{
    User,
    UserComent,
    UserField,
    UserPosition,
    Game,
    GameApplication,
    GameInvitation,
    Property,
    PropertyTypeField,
    sequelize
}