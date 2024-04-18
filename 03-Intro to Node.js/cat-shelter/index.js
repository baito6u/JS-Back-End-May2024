const http = require("http");

const port = 5000;
const styles = require("./styles-css");
const homeView = require("./views/home-html");
const addCatView = require("./views/addCat-htm");

const cats = [
    {
        id: 1,
        name: "Topcho",
        imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
        breed: 'Bombay Cat',
        description: "domastic cat domastic cat domastic cat domastic cat domastic cat"
    }
]

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    res.write(homeView(cats));
    res.end();
  } else if (req.url === "/content/styles/site.css") {
    res.writeHead(200, {
      "content-type": "text/css",
    });

    res.write(styles);
    res.end();
  } else if (req.url === "/cats/add-cat") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    res.write(addCatView);
    res.end();
  } else {
    res.writeHead(200, {
        "content-type": "text/html",
      });
  
      res.write('<h1>404</h1>');
      res.end();
  }
});

server.listen(port);
console.log("Server is listening on port 5000...");
