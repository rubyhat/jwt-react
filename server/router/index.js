const Router = require("express").Router;
const userController = require("../controllers/user-controller");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate); // Активация аккаунта по ссылке, которая придет на почту
router.get("/refresh", userController.refresh); // Перезапись access token в случае истечения срока жизни токена
router.get("/users", userController.getUsers);

module.exports = router;
