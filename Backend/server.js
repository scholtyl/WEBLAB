const express = require("express");
var jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

let server = express();
server.use(bodyParser.json());

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server is listening on port: ${port}`));

server.post("/login", function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  var token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "1h" });
  res.send(token);
});

server.get("", function (req, res, next) {
  console.log(req.headers.authorization);

  const token = req.headers.authorization.split(" ")[1];
  console.log(token);

  jwt.verify(token, "shhhhh", function (err, decoded) {
    if (err) {
      console.log(err);
      res.send("Nöööö");
    } else {
      console.log(decoded.foo);
      res.send("wow logged in :)");
    }
  });
});

// curl --header "Content-Type: application/json" --request POST --data "{\"password\":\"password\", \"username\":\"admin\"}" http://localhost:8000/login

// curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3Mzg5MTg2OTYsImV4cCI6MTczODkyMjI5Nn0.TWzpGDpEHJ5an_DdUwP4sXwqhmqhQ6sDT2rdCmwRlg8" http://localhost:8000