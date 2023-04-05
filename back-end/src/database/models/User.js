const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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

      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: 'users', }
  );

  User.associate = ({ Sales }) => {
    User.hasMany(Sales, { foreignKey: 'userId', as: 'customer'  });
    User.hasMany(Sales, { foreignKey: 'sellerId', as: 'seller' });
  };

  return User;
};

module.exports = UserModel;
