const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5005; // Explicitly using 5005

app.use(cors());
app.use(bodyParser.json());

// Routes
const routes = require('./routes');
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
