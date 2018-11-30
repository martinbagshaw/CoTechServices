const handlers = require("./handlers.js");
const server = require("./server.js");

const router = (req, res) => {
  const url = req.url;
  console.log(`You are at ${url}`);
  if (url === "/") {
    handlers.handleHomeRoute(req, res);
  } else if (url.indexOf("public") !== -1) {
    handlers.handlePublic(req, res, url);
  } else if (url === "/coTechRequest") {
    handlers.handleCoTechRequest(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`404 File Not found`);
  }
};

module.exports = router;
