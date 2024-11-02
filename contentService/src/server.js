const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getDatabaseConnection } = require('./controllers/DBconnection');
const cookieparser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 80;
const APIRouter = require('./routers/routes');

app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(APIRouter);

let connection = getDatabaseConnection();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;

