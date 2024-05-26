const { homeContoller, aboutController, notFoundController, detailsController } = require("../controllers/homeController");

const router = require("express").Router();

router.get('/', homeContoller);
router.get('/about', aboutController);
router.get('/details/:id', detailsController);


router.get('*', notFoundController)

module.exports = { router };
