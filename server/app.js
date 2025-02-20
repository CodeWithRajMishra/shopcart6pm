const express=require('express')
require('dotenv').config();
const app=express();
const path = require('path') 
const bodyParser=require('body-parser')
const adminRoute= require("./routes/adminRoute");
const productRoute= require("./routes/productRoute");
const userRoute= require("./routes/userRoute");
const paymentRoute=require("./routes/payment");
const cors=require('cors')
const db=require('./db') //used to connect the database with database file
db();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use("/admin", adminRoute);
app.use("/product",productRoute);
app.use("/user", userRoute);

app.use("/api/payment/",paymentRoute);


const port=process.env.PORT
app.listen(port,function(){
console.log(`server listening on port ${port}`)
})