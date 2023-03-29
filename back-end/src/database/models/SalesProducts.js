const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    "SalesProducts",
    {
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sale_id",
      },

      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_id",
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    { underscored: true, timestamps: false, tableName: "sales_products" }
  );

  SalesProducts.associate = (models) => {
    models.Sales.belongsToMany(models.Product, {
      as: "Product",
      through: SalesProducts,
      foreignKey: "productId",
      otherKey: "saleId",
    });
    models.Product.belongsToMany(models.Sales, {
      as: "Sale",
      through: SalesProducts,
      foreignKey: "saleId",
      otherKey: "productId",
    });
  };

  return SalesProducts;
};

module.exports = SalesProductsModel;
