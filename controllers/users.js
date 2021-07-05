const Users = require('../repositories/users');
// const { HttpCode } = require("../helpers/constans");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

// const User = require('../model/user');

const SECRET_KEY = process.env.SECRET_KEY;
const IMG_DIR = path.join(__dirname, "../", "public", "images");


async function create(req, res, next) {
  try {
    const { email } = req.body;

    const user = await Users.findByEmail(email);
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        data: "Conflict",
        message: "Email in use",
      });
    }

    const newUser = await Users.createUser(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isPasswordValid = await user.validPassword(password);

    if (!user || !isPasswordValid) {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "Unauthorized",
        message: "Email or password is wrong",
      });
    }

    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
}

async function logout(req, res, next) {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(204).json({});
  } catch (e) {
    next(e);
  }
}

async function current(req, res, next) {
  try {
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        id: req.user.id,
        email: req.user.email,
        subscription: req.user.subscription,
        avatarURL: req.user.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
}

async function updateSubscription(req, res, next) {
  try {
    const id = req.user.id;
    const subscription = req.body.subscription;
    await Users.updateSubscription(id, subscription);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        id: req.user.id,
        email: req.user.email,
        subscription,
        // avatar,
      },
    });
  } catch (e) {
    next(e);
  }
}

async function avatars(req, res, next) {
  try {
    await saveImage(req, res, next);
    const id = req.user.id;
    console.log(req.file);
    const newURL = `http://localhost:3000/images/${req.file.originalname}`;
    const newAvatar = await Users.updateAvatar(id, newURL);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarURL: newAvatar.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
}
async function saveImage(req, res, next) {
  try {
    // const id = req.user.id;
    const { file } = req;
    const img = await Jimp.read(file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path);

    await fs.rename(file.path, path.join(IMG_DIR, file.originalname));
  } catch (e) {
    next(e);
  }
}

module.exports = {
  create,
  login,
  logout,
  current,
  updateSubscription,
  avatars,
  saveImage,
};


// const register = async (req, res, next) => {
//   try {
//     const user = await Users.findByEmail(req.body.email);

//     if (user) {
//       return res.status(HttpCode.CONFLICT).json({
//         status: "error",
//         code: HttpCode.CONFLICT,
//         message: "Email is already used",
//       });
//     }

//     const { password, subscription, email, id } = await Users.create(req.body);
//     return res.status(HttpCode.CREATED).json({
//       status: "success",
//       code: HttpCode.CREATED,
//       data: { password, subscription, email, id },
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const login = async (req, res, next) => {
//   try {
//     const user = await Users.findByEmail(req.body.email);
//     const isValidPassword = await user.isValidPassword(req.body.password);
//     if (!user || !isValidPassword) {
//       return res.status(HttpCode.UNAUTHORIZED).json({
//         status: "error",
//         code: HttpCode.UNAUTHORIZED,
//         message: "Invalid credentials",
//       });
//     }
//     const id = user.id;
//     const payload = { id, test: "Larisa the best" };
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
//     await Users.updateToken(id, token);
//     return res.json({ status: "success", code: 200, data: { token } });
//   } catch (e) {
//     next(e);
//   }
// };

// const logout = async (req, res, next) => {
//   try {
//     const id = req.user.id
//     await Users.updateToken(id, null)
//     return res.status(HttpCode.NO_CONTENT).json({})
//   } catch (e) {
//     next(e)
//   }
// };

// module.exports = {
//   register,
//   login,
//   logout,
// };
