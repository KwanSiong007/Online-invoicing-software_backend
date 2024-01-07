"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    static associate(models) {
      this.belongsTo(models.invoices);
    }
  }
  InvoiceItem.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      invoice_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "invoices",
          key: "id",
        },
      },
      invoice_item: { type: DataTypes.STRING(255) },
      description: { type: DataTypes.STRING(255) },
      quantity: { type: DataTypes.INTEGER },
      price_of_each_item: { type: DataTypes.DECIMAL },
    },
    {
      sequelize,
      modelName: "invoice_items",
      underscored: true,
    }
  );
  return InvoiceItem;
};
