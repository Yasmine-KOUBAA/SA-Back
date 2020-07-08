const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'result',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: Sequelize.INTEGER
    },
    Positive: {
        type: Sequelize.DOUBLE
    },
    Negative: {
        type: Sequelize.DOUBLE
    },
    Neutral: {
        type: Sequelize.DOUBLE
    },    
    Sadness: {
        type: Sequelize.DOUBLE
    },
    Joy: {
        type: Sequelize.DOUBLE
    },
    Fear: {
        type: Sequelize.DOUBLE
    },
    Anger: {
        type: Sequelize.DOUBLE
    },
    Analytical: {
        type: Sequelize.DOUBLE
    },
    Confident: {
        type: Sequelize.DOUBLE
    },
    Tentative: {
        type: Sequelize.DOUBLE
    },
    word: {
        type: Sequelize.DOUBLE
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