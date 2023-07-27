'use strict';
const {hashPassword} = require('../helper/bcrypt.js')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cuisine, {foreignKey: 'authorId'})
    }
  }
  User.init({
    username: {      
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserName cannot be empty!"
        }, 
        notEmpty: {
          msg: "UserName cannot be empty!"
        }
      }
    },
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
    role: {      
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role cannot be empty!"
        }, 
        notEmpty: {
          msg: "Role cannot be empty!"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hashPassword(user.password)
  })
  return User;
};