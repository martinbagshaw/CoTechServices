const http = require("http");
const router = require("./router");
const port = process.env.port || 4000;

const server = http.createServer(router);
server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
