const express = require('express');

const routes = require('./routes');

const app = express();

const PORT = 3000;

app.use(express.static('static'));
app.use(express.urlencoded({extended: false}));

app.use(routes);

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
