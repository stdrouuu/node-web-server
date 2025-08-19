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
const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.end("<h1>Ini adalah homepage</h1>");
    } else {
      response.end(
        `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end("<h1>Halo! Ini adalah halaman about</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
      });
    } else {
      response.end(
        `<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`
      );
    }
  } else {
    response.end("<h1>Halaman tidak ditemukan!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
// to see response, run terminal/cmd: --------------------------------------------------------------------
// curl -X GET http://localhost:5000/about ==> output: <h1>Halo! Ini adalah halaman about</h1>
// curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dicoding\"}" ==> output: <h1>Halo, Dicoding! Ini adalah halaman about</h1>
// curl -X PUT http://localhost:5000/about ==> output: <h1>Halaman tidak dapat diakses menggunakan PUT request</h1>
// curl -X DELETE http://localhost:5000/about ==> output: <h1>Halaman tidak dapat diakses menggunakan DELETE request</h1>
