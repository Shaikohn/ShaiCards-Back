require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const { PORT, CONNECTION_URL } = process.env;
const routes = require('./routes/index'); 
const http = require("http");
const { Server } = require("socket.io")

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE"],
    }
})

io.on("connection", (socket) => {

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_card", (data) => {
        socket.to(data.room).emit("receive_card", data)
    })
})

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'))

app.use("/", routes);

mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

module.exports = app