module.exports = {
    createCastGetController: (req, res) => {
        res.render('cast-create');
    },
    createCastPostController: (req, res) => {
        console.log(req.body);

        res.redirect('/')
    }
}