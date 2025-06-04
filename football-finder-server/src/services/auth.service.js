import { User, UserField, UserPosition } from "../model/index.model.js";
import {
  generatePassword,
  comparePassword,
  generateToken,
} from "../utils/auht.utils.js";

import { validateUser } from "../utils/validation.utils.js";

const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const { name, email, password, age, zone, positions, fields } = req.body;

    const validation = validateUser(req.body);
    if (validation.error)
      return res.status(400).json({ message: validation.message });

    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !positions ||
      !fields ||
      !zone
    ) {
      return res.status(400).json({ message: "Missing data" });
    }

    const newUser = await User.create({
      password: await generatePassword(password),
      age,
      positions,
      fields,
      name,
      email,
      zone,
    });

    const userPositions = positions.map((pos) => ({
      position: pos,
      user_id: newUser.id,
    }));
    await UserPosition.bulkCreate(userPositions);

    const userFields = fields.map((field) => ({
      field: field,
      user_id: newUser.id,
    }));
    await UserField.bulkCreate(userFields);

    const userResponse = await User.findByPk(newUser.id, {
      include: [
        {
          model: UserPosition,
          as: "positions",
          attributes: ["position"],
        },
        {
          model: UserField,
          as: "fieldsType",
          attributes: ["field"],
        },
      ],
    });

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validation = validateUser(req.body);
    if (validation.error)
      return res.status(400).json({ message: validation.message });

    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser)
      return res.status(400).json({ message: "User doesent exists" });
    if (!comparePassword(password, existingUser.password))
      return res.status(401).json({ message: "email or password incorrect" });
    const token = generateToken(email, existingUser.rol, existingUser.id, existingUser.name);
    return res.json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  register,
  login,
};
