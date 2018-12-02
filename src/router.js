const handlers = require("./handlers.js");

const router = (req, res) => {
  const url = req.url;
  const method = req.method;

  // notes from dom.js:
  
  // changing location.href does not log out the url here - only on the front end
  // - tests folder does not log out here. Maybe because tests.js is not run with node
  // - looked for server side routing on hashchange (adding # to url. No joy)
  // console.log(url);
  // console.log(method);


  if (url === "/") {
    handlers.handleHomeRoute(req, res);
  }
  // else if (url === "/coTechRequest") { in office, can get API
  else if (url === "/src") {
    handlers.handleCoTechRequest(req, res);
  }
  // listen for post method - Wikipedia request
  else if (method === "POST" && url.includes('/search')) { 
    handlers.handleWikiRequest(req, res);
  }
  else if (url.indexOf("public") !== -1) {
    handlers.handlePublic(req, res);
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`404 File Not found`);
  }
};

module.exports = router;
