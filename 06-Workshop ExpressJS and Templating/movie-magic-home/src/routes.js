const express = require("express");
const router = express.Router(); // new instans of exxpress Router

const homeController = require('./controllers/homeController')
const movieController = require('./controllers/movieController')

router.use(homeController);
router.use(movieController);

module.exports = router;
