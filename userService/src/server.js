const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getDatabaseConnection } = require('./controllers/DBconnection');

const app = express();
const port = process.env.PORT || 3000;
const APIRouter = require('./routers/routes');

app.use(cors());
app.use(express.json());
app.use('/api', APIRouter);

let connection = getDatabaseConnection();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
