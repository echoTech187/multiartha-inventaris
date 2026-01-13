const express = require('express');
const router = require('./router');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

module.exports = app;