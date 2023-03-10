const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// Config
require("dotenv").config();


const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use(cors({
	origin: process.env.FRONTEND_URL,
	credentials: true
}));

// app.use(cors({ origin: "*" }));


app.options("*", cors());
app.use('/api/v1', product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for Errors
app.use(errorMiddleware)

module.exports = app