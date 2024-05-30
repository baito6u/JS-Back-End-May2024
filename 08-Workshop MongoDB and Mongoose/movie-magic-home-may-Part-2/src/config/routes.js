const { createCastGetController, createCastPostController } = require("../controllers/castController");
const { homeContoller, detailsController, createGetController, searchController, createPostController } = require("../controllers/movieController");
const { aboutController, notFoundController } = require("../controllers/staticViewsController");

const router = require("express").Router();

router.get('/', homeContoller);
router.get('/about', aboutController);
router.get('/details/:id', detailsController);
router.get('/create/movie', createGetController);
router.post('/create/movie', createPostController);
router.get('/create/cast', createCastGetController);
router.post('/create/cast', createCastPostController);
router.get('/search', searchController);


router.get('*', notFoundController)

module.exports = { router };
