const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    },    
    password: {
        type: Sequelize.STRING
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)