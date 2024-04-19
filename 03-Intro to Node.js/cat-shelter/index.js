const http = require("http");

const port = 5000;
const styles = require("./styles-css");
const homeView = require("./views/home-html");
const addCatView = require("./views/addCat-htm");
const addBreedView = require("./views/addBreed-html");

const cats = [
    {
        id: 1,
        name: "Topcho",
        imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
        breed: 'Bombay Cat',
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 2,
        name: "Pretty Kitty",
        imageUrl: "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg",
        breed: 'Bombay Cat',
        description: "domastic cat domastic cat domastic cat domastic cat domastic cat"
    },
    {
        id: 3,
        name: "Topcho",
        imageUrl: "https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg",
        breed: 'Bombay Cat',
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 4,
        name: "Topcho",
        imageUrl: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
        breed: 'Bombay Cat',
        description: "domastic cat domastic cat domastic cat domastic cat domastic cat"
    },
    {
        id: 5,
        name: "Topcho",
        imageUrl: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
        breed: 'Bombay Cat',
        description: "domastic cat domastic cat domastic cat domastic cat domastic cat"
    },
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
  } else if (req.url === "/cats/add-breed") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    res.write(addBreedView);
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
console.log("created by Todor Krumov");
console.log("created by Todor Krumov");
