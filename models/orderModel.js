const {Model, DataTypes } = require('sequelize');
const {sequelize} = require('../utils/db');

class order extends Model {}
order.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  from_country: DataTypes.STRING,
  from_airport: DataTypes.STRING,
  to_country: DataTypes.STRING,
  to_airport: DataTypes.STRING,
  total: DataTypes.INTEGER,
  stripe_id: DataTypes.STRING,
  status: DataTypes.STRING
}, { sequelize, modelName: 'orders' });

module.exports ={
    order
}