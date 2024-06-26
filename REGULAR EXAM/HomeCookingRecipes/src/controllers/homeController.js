const { getRecent } = require('../services/dataService');

const homeRouter = require('express').Router();

homeRouter.get('/', async (req, res) => {
    //const data = await getRecent();
    
    res.render('home');
});

module.exports = homeRouter;