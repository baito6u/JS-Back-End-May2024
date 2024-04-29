const express = require("express");
const router = express.Router(); // new instans of exxpress Router

const homeController = require('./controllers/homeController')

router.use(homeController);

module.exports = router;
