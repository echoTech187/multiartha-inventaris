'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) { }
  }
  Product.init({
    name: DataTypes.STRING,
    stock: DataTypes.NUMBER,
    price: DataTypes.NUMBER,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};