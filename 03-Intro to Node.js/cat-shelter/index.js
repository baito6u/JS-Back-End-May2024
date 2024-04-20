const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const port = 5000;

const cats = [
  {
    id: 1,
    name: "Topcho",
    imageUrl:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
    breed: "Bombay Cat",
    description:
      "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
  },
  {
    id: 2,
    name: "Pretty Kitty",
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg",
    breed: "Bombay Cat",
    description:
      "domastic cat domastic cat domastic cat domastic cat domastic cat",
  },
  {
    id: 3,
    name: "Topcho",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg",
    breed: "Bombay Cat",
    description:
      "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
  },
  {
    id: 4,
    name: "Topcho",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
    breed: "Bombay Cat",
    description:
      "domastic cat domastic cat domastic cat domastic cat domastic cat",
  },
  {
    id: 5,
    name: "Topcho",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
    breed: "Bombay Cat",
    description:
      "domastic cat domastic cat domastic cat domastic cat domastic cat",
  },
];

const views = {
  home: "./views/home.html",
  addCat: "./views/addCat.html",
  addBreed: "./views/addBreed.html",
  style: "./content/styles/site.css",
  cat: "./views/part/cat.html",
};

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    render(views.cat, cats, (err, catResult) => {
      if (err) {
        res.statusCode = 404;
        return res.end();
      }

      render(views.home, [{ cats: catResult }], (err, result) => {
        res.writeHead(200, {
          "content-type": "text/html",
        });

        res.write(result);
        res.end();
      });
    });
  } else if (req.url === "/content/styles/site.css") {
    fs.readFile(views.style, { encoding: "utf-8" }, (err, result) => {
      if (err) {
        res.statusCode = 404;
        return res.end();
      }
      res.writeHead(200, {
        "content-type": "text/css",
      });

      res.write(result);
      res.end();
    });
  } else if (req.url === "/cats/add-cat" && req.method === "GET") {
    fs.readFile(views.addCat, { encoding: "utf-8" }, (err, result) => {
      if (err) {
        res.statusCode = 404;
        return res.end();
      }

      res.writeHead(200, {
        "content-type": "text/html",
      });

      res.write(result);
      res.end();
    });
  } else if (req.url === "/cats/add-cat" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("close", () => {
      const parssedBody = querystring.parse(body);
      parssedBody.id = cats[cats.length - 1].id + 1;
      cats.push(parssedBody);
      
      res.writeHead(302, { location: "/" });
      res.end();
    });
  } else if (req.url === "/cats/add-breed") {
    fs.readFile(views.addBreed, { encoding: "utf-8" }, (err, result) => {
      if (err) {
        res.statusCode = 404;
        return res.end();
      }

      res.writeHead(200, {
        "content-type": "text/html",
      });

      res.write(result);
      res.end();
    });
  } else {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    res.write("<h1>404</h1>");
    res.end();
  }
});

function render(view, dataArr, callback) {
  fs.readFile(view, "utf-8", (err, result) => {
    if (err) {
      return callback(err);
    }

    const htmlResult = dataArr.map(data => {
        return Object.keys(data).reduce((acc, key) => {
          const pattern = new RegExp(`{{${key}}}`, "g");
          return acc.replace(pattern, data[key]);
        }, result);
    }).join("\n")

    callback(null, htmlResult);
  });
}

server.listen(port);
console.log("Server is listening on port 5000...");
console.log("created by Todor Krumov");
