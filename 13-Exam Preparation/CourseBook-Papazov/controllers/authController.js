const authRouter = require('express').Router();

authRouter.get('/register', (req, res) => {
    res.render('register');
});

module.exports = authRouter;