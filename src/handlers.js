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
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, we'v had a problem on our end</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
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

/*************** CO TECH API CALL ****************************************/
const handleCoTechRequest = (req, res) => {

  console.log("serving cotech route");
  request(
    "https://www.coops.tech/wp-json/wp/v2/service",
    { json: true },
    (error, response, body) => {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      //console.log("body:", body[0].slug);

      body.forEach((item)=>{console.log(item.slug)});


      // console.log(body.explanation);
    }
  );
};
// console.log(request);

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleCoTechRequest
};
