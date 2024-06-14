const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
