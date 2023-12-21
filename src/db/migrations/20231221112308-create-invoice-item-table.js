"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invoice_items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "invoices",
          key: "id",
        },
      },
      invoice_item: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      price_of_each_item: {
        type: Sequelize.DECIMAL,
        scale: 2,
        allowNull: false,
      },
      total_price: { type: Sequelize.DECIMAL, scale: 2, allowNull: false },
      gst: { type: Sequelize.DECIMAL, scale: 2, allowNull: false },
      total_amount_with_gst: {
        type: Sequelize.DECIMAL,
        scale: 2,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("invoice_items");
  },
};
