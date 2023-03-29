const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      urlImage: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "url_image",
      },
    },
    { underscored: true, timestamps: false, tableName: 'products'  }
  );

  return Product;
};

module.exports = ProductModel;
