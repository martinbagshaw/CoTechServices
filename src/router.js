const handlers = require("./handlers.js");

const router = (request, response) => {
  const url = request.url;
  console.log(url);
  if (url === "/") {
    console.log("You are at home.");
    handlers.handleHomeRoute(request, response);
  } else if (url.indexOf("public") !== -1) {
    console.log("Trying to get public");
    handlers.handlePublic(request, response, url);
  } else if (url === "/onload") {
    console.log("You are onload page");
    handlers.handleCoTechRequest(request, response);
  } else {
    response.writeHead(404, "Content-Type: text/html");
    response.end(`404 File Not found`);
  }
};

module.exports = router;
