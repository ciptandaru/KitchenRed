"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" });
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" });
      Cuisine.hasMany(models.Favorite, { foreignKey: "CuisineId" });
    }

    get formatCurrency() {
      Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
        this.price
      );
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cannot be empty!",
          },
          notEmpty: {
            msg: "Name cannot be empty!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description cannot be empty!",
          },
          notEmpty: {
            msg: "Description cannot be empty!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price cannot be empty!",
          },
          notEmpty: {
            msg: "Price cannot be empty!",
          },
          min: {
            args: [[5000]],
            msg: "Price should not be below 5000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image cannot be empty!",
          },
          notEmpty: {
            msg: "Image cannot be empty!",
          },
        },
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User cannot be empty!",
          },
          notEmpty: {
            msg: "User cannot be empty!",
          },
        },
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category cannot be empty!",
          },
          notEmpty: {
            msg: "Category cannot be empty!",
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
