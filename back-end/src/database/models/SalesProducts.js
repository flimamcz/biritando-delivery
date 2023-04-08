const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    "SalesProducts",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    { underscored: true, timestamps: false, tableName: "sales_products" }
  );

  SalesProducts.associate = ({ Products, Sales }) => {
    Sales.belongsToMany(Products, {
      as: "products",
      through: SalesProducts,
      foreignKey: "saleId",
      otherKey: "productId",
    });
    Products.belongsToMany(Sales, {
      as: "sales",
      through: SalesProducts,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  };

  return SalesProducts;
};

module.exports = SalesProductsModel;
