"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "seller_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "delivery_address",
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        field: "total_price",
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "sale_date",
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "delivery_number",
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("sales");
  },
};
