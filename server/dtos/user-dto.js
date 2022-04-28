// DTO - Data Transfer Object
// Необходима для того, чтобы отфилтровать какие поля будем использовать в методе генерации токена
module.exports = class UserDto {
  id;
  email;
  isActivated;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
};
