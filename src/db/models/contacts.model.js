"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Contact.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: { type: DataTypes.STRING(255) },
      uen: { type: DataTypes.STRING(255) },
      customer_name: { type: DataTypes.STRING(255) },
      email: {
        type: DataTypes.STRING(255),
        // * added validation
        // validate: {
        //   isEmail: true,
        // },
      },
      phone: { type: DataTypes.STRING(255) },
    },
    {
      sequelize,
      modelName: "contacts",
      underscored: true,
    }
  );
  return Contact;
};
