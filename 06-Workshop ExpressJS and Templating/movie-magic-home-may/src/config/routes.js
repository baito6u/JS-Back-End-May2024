const { homeContoller, aboutController, notFoundController } = require("../controllers/homeController");

const router = require("express").Router();

router.get('/', homeContoller);
router.get('/about', aboutController);


router.get('*', notFoundController)

module.exports = { router };
