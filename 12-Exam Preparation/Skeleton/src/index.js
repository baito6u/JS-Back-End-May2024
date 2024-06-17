const express = require("express");
const { databaseConfig } = require("./config/databaseConfig");
const { expressConfig } = require("./config/expressConfig");
const { hbsConfig } = require("./config/hbsConfig");
const { routesConfig } = require("./config/routesConfig");
const { register, login } = require("./services/userService");
const { createToken, verifyToken } = require("./services/jwt");

start();

async function start() {
  const PORT = 3000;
  const app = express();

  await databaseConfig();
  hbsConfig(app);
  expressConfig(app);
  routesConfig(app);

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    //testFunction();
  });
}

async function testFunction() {
    try {
        const result = await login("john", "123456");
        console.log(result);

        const token = createToken(result);
        console.log(token);

        const parsedData = verifyToken(token);
        console.log(parsedData);

    } catch (error) {
        console.log("Caught error");
        console.log(error.message);
    }
}
