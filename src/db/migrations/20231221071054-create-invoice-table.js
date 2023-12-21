/* eslint-disable no-undef */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uen: {
        type: Sequelize.STRING,
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      invoice_no: { type: Sequelize.STRING, allowNull: false },
      issue_date: { type: Sequelize.DATE, allowNull: false },
      due_date: { type: Sequelize.DATE, allowNull: false },
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
    await queryInterface.dropTable("invoices");
  },
};
