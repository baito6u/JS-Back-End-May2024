const { homeContoller, detailsController, createGetController, searchController } = require("../controllers/movieController");
const { aboutController, notFoundController } = require("../controllers/staticViewsController");

const router = require("express").Router();

router.get('/', homeContoller);
router.get('/about', aboutController);
router.get('/details/:id', detailsController);
router.get('/create', createGetController);
router.get('/search', searchController);


router.get('*', notFoundController)

module.exports = { router };
