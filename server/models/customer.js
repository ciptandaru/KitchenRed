"use strict";
const { Model } = require("sequelize");
const {hashPassword} = require('../helper/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Favorite, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
      email: {      
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is Already!"
        },
        validate: {
          isEmail: {
            msg: "Invalid format Email!"
          },
          notNull: {
            msg: "Email cannot be empty!"
          }, 
          notEmpty: {
            msg: "Email cannot be empty!"
          }
        }
      },
      password: {      
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be empty!"
          }, 
          notEmpty: {
            msg: "Password cannot be empty!"
          }
        }
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  Customer.beforeCreate(customer => {
    customer.password = hashPassword(customer.password)
  })
  return Customer;
};
