const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;


/**
 * DB import
 */
const db = require('./config/db');
const apiRoute = require('./src/routes/index')   // load routing file

app.use(cors());          // CORS-enabled for all origins
app.use(express.json());   // parses incoming JSON requests and puts the parsed data in req.body

app.use('/api', apiRoute);

app.listen(port, () => console.log(`PROJECT START ON ${port}`));