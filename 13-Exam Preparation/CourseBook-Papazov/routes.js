const router = require('express').Router();

const authRouter = require('./controllers/authController');
const homeRouter = require('./controllers/homeController');


router.use(homeRouter);
router.use(authRouter);

module.exports = router;