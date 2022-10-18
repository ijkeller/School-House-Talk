'use strict';

require('dotenv').config();
const {Sequelize, DataTypes} = require ('sequelize');
const studentSchema = require('./student-schema');
const sportSchema = require('./sport-list');
const ModelInterface = require('./model-interface');

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  typeValidation: true,
} : {
  typeValidation: true,
};

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const studentMod = studentSchema(sequelize, DataTypes);
const sportMod = sportSchema(sequelize, DataTypes);

module.exports = {
  sequelize,
  student: new ModelInterface(studentMod),
  sport: new ModelInterface(sportMod),
};