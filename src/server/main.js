require("dotenv").config();

const express = require("express");
const router = require("vite-express");
const app = express();
const client = require("./db/client");
const { seedDatabase } = require("./db/seed");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static("public"));

const db = require("./db/client");
db.connect();

const apiRouter = require("./api");
app.use("/api", apiRouter);

router.listen(app, 3000, async () => {
  let users = await client.query({
    text: "select * from users;",
    values: [],
  });
  console.log("users : ", users.rows.length);
   //console.log("users : ",users)
  if (users.rows.length === 0){
    console.log("seeding...");
    await seedDatabase(false);
    // db.connect();
  }
  console.log("Server is listening on port 3000...");
});

module.exports = router;
