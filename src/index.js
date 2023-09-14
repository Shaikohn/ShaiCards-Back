require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose') ;
const cors = require('cors') 
const morgan = require('morgan')
const { PORT, CONNECTION_URL } = process.env
const routes = require('./routes/index') ; 

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'))

app.use("/", routes);

mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

module.exports = app