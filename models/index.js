const db = require('../db');
const UserModel = require("./users");
const PostModel = require('./posts');

module.exports = {
    dbConnection: db,
    UserModel, PostModel
}