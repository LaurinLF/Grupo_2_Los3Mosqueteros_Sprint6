'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.hasMany(models.Categories,{
        as: 'categories',
        foreignKey: 'id_category'
      })

      Products.hasMany(models.Colors, {
        as: 'colors',
        foreignKey: 'id_color'
      })

      Products.belongsTo(models.Images, {
        as: 'images',
        foreignKey: 'id_product'
      })

      Products.belongsToMany(models.Users, {
        as: 'users',
        thorugh: 'products_users',
        foreignKey: 'id_product'
      })
    }
  }
  Products.init({
    id_product: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    measures: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
    id_color: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};