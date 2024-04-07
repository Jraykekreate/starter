/////SErveer
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME}/g, product.productName);
  output = temp.replace(/{%IMAGE}/g, product.image);
  output = temp.replace(/{%FROM}/g, product.from);
  output = temp.replace(/{%NUTRIENTS}/g, product.nutrients);
  output = temp.replace(/{%QUANTITY}/g, product.quantity);
  output = temp.replace(/{%DESCRIPTION}/g, product.description);
  output = temp.replace(/{%ID}/g, product.id);
  if (!product.organic) output = output.replace(/%NOT_ORGANIC/g, "not-organic");
  console.log(output);
  return output;
};
const fs = require("fs");
const http = require("http");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template_card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const dataObj = JSON.parse(data);
const url = require("url");
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName == "/overview" || pathName == "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObj
      .map((el) => {
        console.log("a", tempCard);
        return replaceTemplate(tempCard, el);
      })
      .join("");
    const output = tempOverview.replace("{%CARDS}", cardsHtml);
    res.end(output);
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "header",
    });
    res.end("<h1>Page not found </h1");
    res.end(data);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to req on port 8000");
});
