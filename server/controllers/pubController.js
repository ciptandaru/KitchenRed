const { Op } = require("sequelize");
const { comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");
const { Cuisine, Category, Customer, Favorite, User } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class PubController {
  //=============================Register============================
  static async registerCus(req, res, next) {
    try {
      const { email, password } = req.body;
      const created = await Customer.create({
        email,
        password,
        role: "customer",
      });
      res.status(201).json({
        email: created.email,
        message: `created`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  //=============================Register END============================
  //=============================Login============================
  static async loginCus(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await Customer.findOne({
        where: { email }
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
        message: "Logged in",
      });
    } catch (err) {
      next(err);
    }
  }
  //=============================Login END============================
  //=============================Login END============================
  static async gLoginCus(req, res, next) {
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

      const [user, created] = await Customer.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "kP4^$)3%^%^$j*M*fG%(B2#sE$4",
          role: "customer",
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
          role: "customer",
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
          role: "customer",
          msg: "Logged in",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  //=============================Login END============================
  //=============================ReadData============================
  static async readCuisinesCus(req, res, next) {
    const { page, pageLimit, search } = req.query;
    try {
      let option = {};
  
      if (page && pageLimit) {
        const parsedPage = parseInt(page);
        const parsedPageLimit = parseInt(pageLimit);
  
        option = {
          include: {
            model: Category,
            attributes: ['name'],
            },
          limit: parsedPageLimit,
          offset: (parsedPage - 1) * parsedPageLimit,
          }
      } else if (!search && !page && !pageLimit) {
        option.include = {
          model: Category,
          attributes: ['name'],
          },
        option.limit = 8;
      } else if (search) {
        option.include = {
          model: Category,
          attributes: ['name'],
          where: {
            name: { [Op.iLike]: `%${search}%` },
          },
        };
      }
  
      const cuisine = await Cuisine.findAndCountAll(option);
  
      if (cuisine.length === 0) {
        throw { name: "NOT_FOUND" };
      }
  
      const totalDb = cuisine.count;
      const perItem = 8;
      const totalPage = Math.ceil(totalDb / perItem);
      const category = await Category.findAll({
        attributes: ['id','name'],
      })
      res.status(200).json({
        statusCode: 200,
        message: cuisine,
        totalPage,
        categories: category
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  //=============================ReadData END============================
  //=============================ReadData detail============================
  static async readCuisinesDetailCus(req, res, next) {
    const { id } = req.params;
    const qrCode = await axios.post(
      `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QRcode}`,
      {
        frame_name: "no-frame",
        qr_code_text: `https://kitchenred-d54dd.web.app/cuisines/${id}`,
        image_format: "SVG",
        qr_code_logo: "scan-me-square",
      }
    );
    try {

      const cuisines = await Cuisine.findByPk(id,{
        include: [{
                  model: Category,
                }]
      });
      if (cuisines === null) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json({
        statuscode: 200,
        message: cuisines,
        qrCode: qrCode.data
      });
    } catch (err) {
      next(err);
    }
  }
  //=============================ReadData detail END============================
  static async readFavorite(req, res, next) {
    try {
      const data = await Favorite.findAll({
        where: {
          CustomerId: req.additionalData.id,
        },
        include: [{
                  model: Cuisine,
                  include: [{
                    model: Category,
                  }]
                }]
      })
      console.log(data);
      res.status(200).json({data: data});
    } catch (err) {
      next(err);
    }
  }
  //=============================get Favorite============================
  static async createFavorite(req, res, next) {
    try {
      const { CuisineId } = req.body;

      const data = await Favorite.findOne({
        where: {
          CuisineId: CuisineId,
          CustomerId: req.additionalData.id,
        },
      });
      if (!data) throw { name: "NOT_FOUND" };

      const created = await Favorite.create({
        CustomerId: req.additionalData.id,
        CuisineId: CuisineId,
      });

      res.status(201).json({
        id: created.id,
        CustomerId: created.CustomerId,
        CuisineId: created.CuisineId,
      });
    } catch (err) {
      next(err);
    }
  }
  //=============================get Favorite============================

}

module.exports = PubController;
