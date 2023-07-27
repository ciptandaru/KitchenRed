const { verifyToken } = require("../helper/jwt");
const { User, Cuisine, Customer } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token);
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }
    const payload = verifyToken(access_token);
    let user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      throw { name: "Unauthenticated" };
    }
    req.additionalData = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    next();
  } catch (err) {
    next(err);
  }
}
async function authenticationCustomer(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token); 
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }
    const payload = verifyToken(access_token);
    let customer = await Customer.findOne({ where: { id: payload.id } });
    if (!customer) {
      throw { name: "Unauthenticated" };
    }
    req.additionalData = {
      id: customer.id,
      email: customer.email,
      role: customer.role,
    };
    next();
  } catch (err) {
    next(err);
  }
}

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: req.additionalData.userId },
    });

    if (!user) throw { name: "Unauthorized" };
    const cuisine = await Cuisine.findOne({ where: { id: id } });
    if (!cuisine) throw { name: "Unauthorized" };
    // ||(user.role === "staff" && )
    // if (cuisine.authorId !== user.id) throw { name: "Unauthorizeddd" };
    if (user.role !== "admin") {
      if (user.id === cuisine.authorId) {
        return next();
      } else {
        throw { name: "Unauthorized" };
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function authorizationCategoryAndStatus(req, res, next) {
  try {
    const { role } = req.additionalData;

    if (role.toLowerCase() === "admin") {
      return next();
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authentication,
  authorization,
  authorizationCategoryAndStatus,
  authenticationCustomer
};
