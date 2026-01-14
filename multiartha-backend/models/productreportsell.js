'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductReportSell extends Model {
    static associate(models) {
      ProductReportSell.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      ProductReportSell.belongsTo(models.User, { foreignKey: 'user_sell_id', as: 'user_sell' });
    }
  }
  ProductReportSell.init({
    product_id: DataTypes.NUMBER,
    amount: DataTypes.NUMBER,
    user_sell_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'ProductReportSell',
  });
  return ProductReportSell;
};