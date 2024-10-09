require("dotenv").config();
const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const multer = require("multer")
const path = require("path")
const cors = require("cors");


//connect to mongoDb
require("./DB/conn")
const app = express();

const PORT = 9000;



//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => { cb(null, 'Images/'); },
//     filename: (req, file, cb) => {
//         const ext = file.originalname.split('.').pop();
//         cb(null, `img${Date.now()}.${ext}`);
//     }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'Images/'); },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

module.exports = { upload };



//routes
const registerRoute = require('./Route/RegisterRoute');
app.use('/', registerRoute);

const adminRoute = require("./Route/AdminRoute");
app.use("/", adminRoute);


const userRoute = require("./Route/UserRoute")
app.use('/', userRoute);

const operationRoute = require("./Route/OperationRoute")
app.use('/', operationRoute)

const emailRoutes = require('./Route/emailRoutes');
app.use('/', emailRoutes);

const paymentRoutes = require('./Route/PaymentRoute');
app.use('/', paymentRoutes);

app.use(express.json());


//start the server
app.listen(PORT, () => {
    console.log(`server is starting at port number ${PORT}`);

});
