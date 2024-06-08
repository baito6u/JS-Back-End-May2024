const castService = require('../services/castService')

module.exports = {
    createCastGetController: (req, res) => {
        res.render('cast-create');
    },
    createCastPostController: async (req, res) => {
        const newCast = req.body;

        try {
            await castService.create(newCast);
            res.redirect('/')
        } catch (error) {
            console.log(error.message);
            res.status(400).end();
        }

    }
}