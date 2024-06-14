const { register } = require('../services/authService');

const authRouter = require('express').Router();

authRouter.get('/register', (req, res) => {
    res.render('register');
});

authRouter.post('/register', async (req, res) => {
    const userData = req.body;

    await register(userData);

    res.redirect('/login');
});

module.exports = authRouter;