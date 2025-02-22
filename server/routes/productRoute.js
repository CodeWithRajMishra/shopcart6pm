const express= require("express");
const route=express.Router();
const ProductController= require("../controllers/productController");

route.get("/homeproductdisplay", ProductController.productDisplay);
route.get("/showfullproduct", ProductController.productAllDisplay);
route.get("/prolist", ProductController.productDisplaybyCat);
route.post("/productratings", ProductController.productRatingSave);


module.exports=route;
