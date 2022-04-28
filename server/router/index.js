const Router = require("express").Router;

const router = new Router();

router.post("/registration");
router.post("/login");
router.post("/logout");
router.get("/activate/:link"); // Активация аккаунта по ссылке, которая придет на почту
router.get("/refresh"); // Перезапись access token в случае истечения срока жизни токена
router.get("/users");

module.exports = router;
