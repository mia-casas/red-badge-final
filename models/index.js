const db = require('../db');
const UserModel = require("./users");
const PostModel = require('./posts');
const LikesModel = require('./likes');

UserModel.hasMany(PostModel);
UserModel.hasMany(LikesModel);

PostModel.hasMany(LikesModel);
PostModel.belongsTo(UserModel)

LikesModel.belongsTo(PostModel)

module.exports = {
    dbConnection: db,
    UserModel, PostModel, LikesModel
}