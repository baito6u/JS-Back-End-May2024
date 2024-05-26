const { homeContoller } = require("../controllers/homeController");

const router = require("express").Router();

router.get('/', homeContoller)

module.exports = { router };
