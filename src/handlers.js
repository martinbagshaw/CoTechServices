const fs = require("fs");
const path = require("path");
const request = require("request");

/***************   HOME ROUTE (HTML) '/'****************************************/
const handleHomeRoute = (request, response) => {
  const url = request.url;
  console.log(`URL: ${url}`);

  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(`Error: ${error}`);
      response.writeHead(500, "Content-Type: text/html");
      response.end("<h1>Sorry, we'v had a problem on our end</h1>");
    } else {
      response.writeHead(200, "Content-Type: text/html");
      response.end(file);
    }
  });
};

/***************  PUBLIC ROUTE (DOM, REQUEST, CSS) ****************************************/

const handlePublic = (request, response, url) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpeg",
    png: "image/jpeg",
    ico: "image/x-icon"
  };

  const filePath = path.join(__dirname, "..", url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, "Content-Type: text/html");
      response.end("<h1>File not found</h1>");
    } else {
      response.writeHead(200, `Content-Type: ${extensionType[extension]}`);
      response.end(file);
    }
  });
};

/***************  API CALL ****************************************/

request(
  "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
  { json: true },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.url);
    console.log(body.explanation);
  }
);

// console.log(request);

module.exports = {
  handleHomeRoute,
  handlePublic
};
