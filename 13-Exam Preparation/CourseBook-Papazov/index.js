const express = require('express');
const handlebars = require('express-handlebars');

const routes = require('./routes');


const app = express();

const PORT = 3000;

app.use(express.static('static'));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use(routes);

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
