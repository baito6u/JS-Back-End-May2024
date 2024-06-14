const { register, login } = require('../services/authService');

const authRouter = require('express').Router();

authRouter.get('/register', (req, res) => {
    res.render('register');
});

authRouter.post('/register', async (req, res) => {
    const userData = req.body;

    await register(userData);

    res.redirect('/login');
});

authRouter.get('/login', (req, res) => {
    res.render('login');
});

authRouter.post('/login', async (req, res) => {
    const userData = req.body;

    await login(userData);
});

module.exports = authRouter;