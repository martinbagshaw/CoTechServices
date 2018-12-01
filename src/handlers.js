const fs = require("fs");
const path = require("path");
const request = require("request");

// as we can't access coop json outside the office:
const serviceJson = require("./services.json");



// home/index page
const handleHomeRoute = (request, response) => {
  const url = request.url;

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



// files
const handlePublic = (request, response, url) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpeg",
    png: "image/png",
    ico: "image/x-icon"
  };

  const filePath = path.join(__dirname, "..", url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>File not found</h1>");
    } else {
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
    }
  });
};



// ______________________________________________

// Co Tech API
// - this does not work if you are not in the office (I think)
const handleCoTechRequest = (req, res) => {
  
  // in office, can use API with the following code:


  // request(
  //   "https://www.coops.tech/wp-json/wp/v2/service",
  //   { json: true },
  //   (err, response, body) => {
  //     if (err) {
  //       response.writeHead(404, { "Content-Type": "application/json" });
  //       response.end("<h1>Sorry, server error.</h1>");
  //     } else {

  //       let serviceArr = [];
  //       body.map(service => {
  //         // push object to array
  //         serviceArr.push({
  //           title: service.title.rendered,
  //           img: service.acf.featured_image.sizes.thumbnail,
  //           url: service.link
  //         })
  //       });
        
  //       res.writeHead(200, { "Content-Type": "application/json" });
  //       res.end(JSON.stringify(serviceArr));
  //     }
  //   }
  // );



  // at home, no API, use static json from file
  const filePath = path.join(__dirname, "../", "src", "services.json");

  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log("json error");
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("this is an json error");
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      let serviceArr = [];
      serviceJson.map(service => {
        // push object to array
        serviceArr.push({
          title: service.title.rendered,
          img: service.acf.featured_image.sizes.thumbnail,
          url: service.link
        })
      });
      res.end(JSON.stringify(serviceArr));
    }
  });
};


  







// Wikipedia API
const handleWikiRequest = (req, res, url) => {

  // need to filter for pages that don't exist before setting searchTerm. Pick a different searchTerm for these
  // - Data Standards

  // get search term from url
  const searchTerm = url.split("/")[2];
  // compose search query string
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${searchTerm}`;

  // run the request
  request(searchUrl,
    { json: true },
    (err, response, body) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end("<h1>Sorry, server error.</h1>");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });

        // console.log(body.query.pages); - gets the stuff we want
        const key = Object.keys(body.query.pages).toString();
        const objRef = body.query.pages;

        // empty object variable
        let responseInfo;

        // if searchTerm matches
        if (key !== '-1') {
          responseInfo = {
            exists: true,
            anchorID: searchTerm,
            title: objRef[key].title,
            info: objRef[key].extract,
            link: `https://en.wikipedia.org/wiki/${searchTerm}`
          }
        }
        // non matching search terms
        else {
          responseInfo = {
            exists: false,
            anchorID: searchTerm
          }
        }
        // stringify the response object
        res.end(JSON.stringify(responseInfo));
      }  
    }
  )
};





















// const handleWikiRequest = (req, res, searchTerm) => {
//   request(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${searchTerm}`,
//     { json: true },
//     (err, res, body) => {
//       if (err) {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         res.end("<h1>Sorry, server error.</h1>");
//       } else {
//         console.log(body);
//         console.log(res);
//         // res.writeHead(200, { "Content-Type": "application/json" });
//         // res.end(JSON.stringify(body));
//       }
//     }
//   )
// };

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleCoTechRequest,
  handleWikiRequest
};
