const userModel = require("../models/user-model");
const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body; // достаем данные из запроса
      const userData = await userService.registration(email, password); // Регистрируем юзера

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); // Сохраняем рефреш токен в куки и важный флаг, httpOnly защищает куки от извлечения в браузере, например при помощи js
      // также если используется https то нужно добавить флаг secure:true

      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {}
  }

  async logout(req, res, next) {
    try {
    } catch (error) {}
  }

  async activate(req, res, next) {
    try {
    } catch (error) {}
  }

  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json("123");
    } catch (error) {}
  }
}

module.exports = new UserController();
