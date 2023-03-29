"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
