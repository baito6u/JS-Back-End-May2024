const http = require("http");
const fs = require("fs/promises");

const PORT = 5555;

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

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    const imageUrlPattern = /{{imageUrl}}/g;
    const namePattern = /{{name}}/g;
    const breedPattern = /{{breed}}/g;
    const descriptionPattern = /{{description}}/g;

    const catTemplate = await fs.readFile("./views/catTemplate.html", "utf-8");
    const homeHtml = await fs.readFile("./views/home/index.html", "utf-8");
    const catHtml = cats
      .map((cat) =>
        catTemplate
          .replace(imageUrlPattern, cat.imageUrl)
          .replace(namePattern, cat.name)
          .replace(breedPattern, cat.breed)
          .replace(descriptionPattern, cat.description)
      )
      .join("");

    const homeHtmlTemplate = homeHtml.replace("{{cats}}", catHtml);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(homeHtmlTemplate);
  } else if (url === "/content/styles/site.css") {
    const siteCss = await fs.readFile("./content/styles/site.css", "utf-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(siteCss);
  } else if (url === "/cats/add-breed") {
    const addBreedHtml = await fs.readFile("./views/addBreed.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(addBreedHtml);
  }
  res.end();
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
console.log("Todor Krumov");