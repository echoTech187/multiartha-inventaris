'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Roles, { foreignKey: 'role_id', as: 'role' });
    }
  }
  Users.init({
    slug: DataTypes.STRING,
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};