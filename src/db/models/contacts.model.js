"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      this.hasMany(models.invoices, { foreignKey: "customer_id" });
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
