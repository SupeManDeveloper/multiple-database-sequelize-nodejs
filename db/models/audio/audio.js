'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audio extends Model {
    static associate(models) {

    }
  }
  Audio.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Audio',
    tableName: 'Audios',
  });
  return Audio;
};