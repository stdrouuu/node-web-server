// 1. builidng HTTP server ------------------------------------------------------------
// const http = require("http");

// const requestListener = (request, response) => {
//   response.setHeader("Content-Type", "text/html");

//   response.statusCode = 200;
//   response.end("<h1>Halo HTTP Server!</h1>");
// };

// const server = http.createServer(requestListener);

// const port = 5000;
// const host = "localhost";

// server.listen(port, host, () => {
//   console.log(`Server berjalan pada http://${host}:${port}`);
// });
// to see response, run terminal/cmd: ---------------------------------------------------
// curl -X GET http://localhost:5000/

// 2. Method/Verb Request (GET, POST, PUT, DELETE)---------------------------------------
//GET = ambil data
//POST = kirim/buat data
//PUT = ubah data
//DELETE = hapus data
// const http = require("http");

// const requestListener = (request, response) => {
//   response.setHeader("Content-Type", "text/html");
//   response.statusCode = 200;

//   const { method } = request;

//   if (method === "GET") {
//     response.end("<h1>Hello!</h1>");
//   }

//   if (method === "POST") {
//     response.end("<h1>Hai!</h1>");
//   }

//   if (method === "PUT") {
//     response.end("<h1>Bonjour!</h1>");
//   }

//   if (method === "DELETE") {
//     response.end("<h1>Salam!</h1>");
//   }
// };

// const server = http.createServer(requestListener);

// const port = 5000;
// const host = "localhost";

// server.listen(port, host, () => {
//   console.log(`Server berjalan pada http://${host}:${port}`);
// });
// to see response, run terminal/cmd: ---------------------------------------------------
// curl -X GET http://localhost:5000 ==> output: <h1>Hello!</h1>
// curl -X POST http://localhost:5000 ==> output: <h1>Hai!</h1>
// curl -X PUT http://localhost:5000 ==> output: <h1>Bonjour!</h1>
// curl -X DELETE http://localhost:5000 ==> output: <h1>Salam!</h1>

// 3. Body Request -----------------------------------------------------------------------
// data tambahan yang dikirim client (biasanya via POST/PUT), diakses dgn request.on digabung sm buffer.concat
// const http = require("http");

// const requestListener = (request, response) => {
//   response.setHeader("Content-Type", "text/html");
//   response.statusCode = 200;

//   const { method } = request;

//   if (method === "GET") {
//     response.end("<h1>Hello!</h1>");
//   }

//   if (method === "POST") {
//     let body = [];

//     request.on("data", (chunk) => {
//       body.push(chunk);
//     });

//     request.on("end", () => {
//       body = Buffer.concat(body).toString();
//       const { name } = JSON.parse(body); //JSON.parse to convert string to javascript object
//       response.end(`<h1>Hai, ${name}!</h1>`);
//     });
//   }
// };

// const server = http.createServer(requestListener);

// const port = 5000;
// const host = "localhost";

// server.listen(port, host, () => {
//   console.log(`Server berjalan pada http://${host}:${port}`);
// });
// to see response, run terminal/cmd: --------------------------------------------------------------------
// curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"Brandon\"}" ==> output: <h1>Hai, Brandon!</h1>

// 4. Routing Request ------------------------------------------------------------------------------------
// GET/ = homepage
// GET/about = halaman about
// POST/about = kirim data ke halaman about
// gada rute = 404 Not Found
// const http = require("http");

// const requestListener = (request, response) => {
//   response.setHeader("Content-Type", "text/html");
//   response.statusCode = 200;

//   const { method, url } = request;

//   if (url === "/") {
//     if (method === "GET") {
//       response.end("<h1>Ini adalah homepage</h1>");
//     } else {
//       response.end(
//         `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
//       );
//     }
//   } else if (url === "/about") {
//     if (method === "GET") {
//       response.end("<h1>Halo! Ini adalah halaman about</h1>");
//     } else if (method === "POST") {
//       let body = [];

//       request.on("data", (chunk) => {
//         body.push(chunk);
//       });

//       request.on("end", () => {
//         body = Buffer.concat(body).toString();
//         const { name } = JSON.parse(body);
//         response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
//       });
//     } else {
//       response.end(
//         `<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`
//       );
//     }
//   } else {
//     response.end("<h1>Halaman tidak ditemukan!</h1>");
//   }
// };

// const server = http.createServer(requestListener);

// const port = 5000;
// const host = "localhost";

// server.listen(port, host, () => {
//   console.log(`Server berjalan pada http://${host}:${port}`);
// });
// to see response, run terminal/cmd: --------------------------------------------------------------------
// curl -X GET http://localhost:5000/about ==> output: <h1>Halo! Ini adalah halaman about</h1>
// curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dicoding\"}" ==> output: <h1>Halo, Dicoding! Ini adalah halaman about</h1>
// curl -X PUT http://localhost:5000/about ==> output: <h1>Halaman tidak dapat diakses menggunakan PUT request</h1>
// curl -X DELETE http://localhost:5000/about ==> output: <h1>Halaman tidak dapat diakses menggunakan DELETE request</h1>

// 5. Response Status -------------------------------------------------------------------------------------
// 200 = success
// 400 = client error (bad request, method salah)
// 404 = not found
// 500 = server error
// const http = require("http");

// const requestListener = (request, response) => {
//   response.setHeader("Content-Type", "text/html");

//   const { method, url } = request;

//   if (url === "/") {
//     if (method === "GET") {
//       response.statusCode = 200;
//       response.end("<h1>Ini adalah homepage</h1>");
//     } else {
//       response.statusCode = 400;
//       response.end(
//         `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
//       );
//     }
//   } else if (url === "/about") {
//     if (method === "GET") {
//       response.statusCode = 200;
//       response.end("<h1>Halo! Ini adalah halaman about</h1>");
//     } else if (method === "POST") {
//       let body = [];

//       request.on("data", (chunk) => {
//         body.push(chunk);
//       });

//       request.on("end", () => {
//         body = Buffer.concat(body).toString();
//         const { name } = JSON.parse(body);
//         response.statusCode = 200;
//         response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
//       });
//     } else {
//       response.statusCode = 400;
//       response.end(
//         `<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`
//       );
//     }
//   } else {
//     response.statusCode = 404;
//     response.end("<h1>Halaman tidak ditemukan!</h1>");
//   }
// };

// const server = http.createServer(requestListener);

// const port = 5000;
// const host = "localhost";

// server.listen(port, host, () => {
//   console.log(`Server berjalan pada http://${host}:${port}`);
// });
// to see response, run terminal/cmd: --------------------------------------------------------------------
//curl -X GET http://localhost:5000/about -i ==> output: HTTP/1.1 200 OK
// curl -X GET http://localhost:5000/test -i ==> output: 404 Not Found
// curl -X DELETE http://localhost:5000/ -i ==> output: 400 Bad Request

// 5. Response Header -------------------------------------------------------------------------------------
// header =  tambahan untuk response, misal content type(JSON, HTML, dll), powered-by. bs akses pk response.setHeader
const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Powered-By", "Node.js");
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
// to see response, run terminal/cmd: --------------------------------------------------------------------
// curl -X GET http://localhost:5000 -i ==> output: content-type: application/json, powered-by: Node.js
