// Сервисы пользователя. Здесь проводятся все манипуляции с моделью User

const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");

class UserService {
  async registration(email, password) {
    const candidate = UserModel.findOne({ email }); // Проверяем, есть ли юзер с таким email

    if (candidate) {
      throw new Error(`Пользователь с адресом ${email} уже существует`);
    }

    const hashPassword = bcrypt.hash(password, 3); // Хешируем пароль, чтобы в БД пароль не лежал открытым
    const activationLink = uuid.v4(); // Генерируем ссылку для активации аккаунта
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink); // Отправка письма на почту с подтверждением акк.
    const token = tokenService.generateTokens();
  }
}

module.exports = new UserService();
