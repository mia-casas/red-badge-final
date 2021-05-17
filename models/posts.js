const { DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageURL: {
      type: DataTypes.STRING
    },
    owner: {
      type: DataTypes.STRING
    }
});

module.exports = Post;