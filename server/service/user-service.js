// Сервисы пользователя. Здесь проводятся все манипуляции с моделью User

const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email }); // Проверяем, есть ли юзер с таким email

    // Если юзер есть, то генерируем ошибку
    if (candidate) {
      throw new Error(`Пользователь с адресом ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3); // Хешируем пароль, чтобы в БД пароль не лежал открытым
    const activationLink = uuid.v4(); // Генерируем ссылку для активации аккаунта
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    }); // Создаем юзера в БД
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    ); // Отправка письма на почту с подтверждением акк.

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto }); // Генерируем access and refresh токены на основе урезанный модели юзера
    await tokenService.saveToken(userDto.id, tokens.refreshToken); // Сохраняем токен в БД

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
