const UserModel = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
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

  Users.associate = ({ Sales }) => {
    Users.hasMany(Sales, { foreignKey: 'userId', as: 'customer'  });
    Users.hasMany(Sales, { foreignKey: 'sellerId', as: 'seller' });
  };

  return Users;
};

module.exports = UserModel;
