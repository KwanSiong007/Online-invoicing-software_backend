"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      this.belongsTo(models.contacts, { foreignKey: "customer_id" });
      this.hasMany(models.invoice_items);
    }
  }
  Invoice.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      customer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      company_name: { type: DataTypes.STRING(255) },
      uen: { type: DataTypes.STRING(255) },
      customer_name: { type: DataTypes.STRING(255) },
      email: { type: DataTypes.STRING(255) },
      phone: { type: DataTypes.STRING(255) },
      invoice_no: { type: DataTypes.STRING(255) },
      issue_date: { type: DataTypes.DATE },
      due_date: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "invoices",
      underscored: true,
    }
  );
  return Invoice;
};
