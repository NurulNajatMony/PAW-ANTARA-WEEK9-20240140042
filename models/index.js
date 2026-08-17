const sequelize = require("../config/database");
const User = require("./user.model");
const Todo = require("./todo.model");
const Category = require("./category.model");

module.exports = {
  sequelize,
  User,
  Todo,
  Category,
};
