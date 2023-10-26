require("dotenv").config();

const express = require("express");
const router = require("vite-express");
const app = express();
const client = require("./db/client");
const { seedDatabase } = require("./db/seed");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static("public"));

const db2 = require("./db/client");

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER || 'localhost',
    password: process.env.PASSWORD || 'password',
    host: 'localhost',
    database: 'commerce',
    port: 5432,
  });

// db.connect();

const apiRouter = require("./api");
app.use("/api", apiRouter);

router.listen(app, 3000, async () => {
  let user = await pool.query({
    text: "select * from user;",
    values: [],
  });
  console.log("users : ", user.rows.length);
   //console.log("users : ",users)
  if (user.rows.length === 0){
    console.log("seeding...");
    await seedDatabase(false);
    // db.connect();
  }
  console.log("Server is listening on port 3000...");
});

module.exports = router;
