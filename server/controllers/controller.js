const { comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");
const { Cuisine, Category, User, History } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async createCuisines(req, res, next) {
    try {
      const { userId, username } = req.additionalData;
      console.log(username, "iniUserName");
      const { name, description, price, imgUrl, categoryId } = req.body;
      const cuisines = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        authorId: userId,
        categoryId,
      });
      const createHistory = await History.create({
        name: "POST",
        description: `${cuisines.name} with ${cuisines.id} created`,
        updatedBy: `${username}`,
        updatedAt: new Date(),
      });
      console.log(createHistory);
      res.status(201).json({
        statuscode: 201,
        message: cuisines,
        createHistory,
      });
    } catch (err) {
      next(err);
    }
  }
  static async readCuisines(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll({
        include: [User, Category],
      });
      cuisines.forEach((el) => {
        if (el.User && el.User.email) {
          el.authorId = el.User.email;
          el.categoryId = el.Category.name;
        }
      });
      res.status(200).json({
        statuscode: 200,
        message: cuisines,
      });
    } catch (err) {
      next(err);
    }
  }
  static async readCuisinesDetail(req, res, next) {
    try {
      const { id } = req.params;
      const cuisines = await Cuisine.findByPk(id);
      if (cuisines === null) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json({
        statuscode: 200,
        message: cuisines,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCuisines(req, res, next) {
    try {
      const { id } = req.params;
      const cuisines = await Cuisine.findByPk(id);
      const cuisinesDestroyed = await Cuisine.destroy({
        where: {
          id: id,
        },
      });
      if (!cuisinesDestroyed) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json({
        statusconde: 200,
        message: `${cuisines.name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({
        statuscode: 200,
        message: categories,
      });
    } catch (err) {
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const created = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "admin",
      });
      res.status(201).json({
        email: created.email,
        message: "created",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "loginInvalid" };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "loginInvalid" };
      }
      const accessToken = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({
        statusCode: 200,
        accessToken,
        id: user.id,
        role: user.role,
        username: User.username,
        message: "Logged in",
      });
    } catch (err) {
      next(err);
    }
  }
  static async gLogin(req, res, next) {
    try {
      const { token_google } = req.headers;
      if (!token_google) {
        throw new Error("Missing Google token");
      }

      const client = new OAuth2Client({
        clientId: process.env.CLIENT_ID,
      });

      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.CLIENT_ID,
      });
      const payload = await ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "kP4^$)3%^%^$j*M*fG%(B2#sE$4",
          role: "staff",
        },
      });
      let token;
      let loggedUser;
      if (created) {
        token = generateToken({ id: created.id, email: created.email });
        loggedUser = created;
        res.status(201).json({
          statusCode: 201,
          accessToken: token,
          id: loggedUser.id,
          email: loggedUser.email,
          username: loggedUser.username,
          role: "staff",
          msg: "created",
        });
      } else {
        token = generateToken({ id: user.id, email: user.email });
        loggedUser = user;
        res.status(200).json({
          statusCode: 200,
          accessToken: token,
          id: loggedUser.id,
          email: loggedUser.email,
          username: loggedUser.username,
          role: "staff",
          msg: "Logged in",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async readDashboard(req, res, next) {
    try {
      let tempCuisine = 0;
      const cuisines = await Cuisine.findAll();
      await cuisines.forEach((el, index) => {
        tempCuisine = index + 1;
      });
      let tempCategory = 0;
      const categories = await Category.findAll();
      await categories.forEach((el, index) => {
        tempCategory = index + 1;
      });
      res.status(200).json({
        statuscode: 200,
        tempCuisine,
        tempCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name,
      });
      res.status(201).json({
        statuscode: 201,
        message: category,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      const categoryDelete = await Category.destroy({
        where: {
          id: id,
        },
      });
      if (!categoryDelete) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json({
        statuscode: 200,
        message: `${category.name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async editCuisines(req, res, next) {
    try {
      const { username } = req.additionalData;
      const { id } = req.params;
      const { name, description, price, imgUrl } = req.body;
      const categoryId = +req.body.categoryId;
      const editCuisines = await Cuisine.update(
        { name, description, price, imgUrl, categoryId },
        {
          where: {
            id: +id,
          },
          returning: true,
        }
      );
      const createHistory = await History.create({
        name: "PUT",
        description: `${name} with ${id} updated`,
        updatedBy: `${username}`,
        updatedAt: new Date(),
      });
      res.status(201).json({
        statuscode: 201,
        message: editCuisines[1][0],
        createHistory,
      });
    } catch (err) {
      next(err);
    }
  }
  static async patchCuisines(req, res, next) {
    try {
      const { username } = req.additionalData;
      const { id } = req.params;
      const { status } = req.body;
      const cuisines = await Cuisine.findByPk(id);
      const editCuisines = await Cuisine.update(
        { status },
        {
          where: {
            id: +id,
          },
          returning: true,
        }
      );
      const createHistory = await History.create({
        name: "PATCH",
        description: `${cuisines.name} status with ${id} has been updated from ${cuisines.status} into ${status}`,
        updatedBy: `${username}`,
        updatedAt: new Date(),
      });
      res.status(201).json({
        statuscode: 201,
        message: editCuisines[1][0],
        createHistory,
      });
    } catch (err) {
      next(err);
    }
  }
  static async readHistories(req, res, next) {
    try {
      const dataHistory = await History.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({
        statuscode: 200,
        message: dataHistory,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Controller;
