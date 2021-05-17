const { DataTypes } = require("sequelize");
const db = require("../db");

const Likes = db.define("likes", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  like: {
    type: DataTypes.INTEGER,
  },
  rating: {
      type: DataTypes.INTEGER,
  },
  comment: {
      type: DataTypes.STRING,
  }
});

module.exports = Likes;