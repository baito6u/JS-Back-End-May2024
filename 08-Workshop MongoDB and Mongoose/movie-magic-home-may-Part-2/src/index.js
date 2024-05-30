const express = require("express");
const { hbsConfig } = require("./config/hbsConfig");
const { expresConfig } = require("./config/expressConfig");
const { router } = require("./config/routes");
const { databaseConfig } = require("./config/databaseConfig");

const PORT = 3000;

async function start() {

  const app = express();
  
  await databaseConfig();
  hbsConfig(app);
  expresConfig(app);
  
  app.use(router);
  
  app.listen(PORT, () =>
    console.log(`Server is listening on port at http://localhost:${PORT}`)
  );
}

start()
