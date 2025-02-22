const ProductModel= require("../models/productModel");
const CustomerorderModel = require("../models/customerorderModel");
const CustomerModel= require("../models/userModel");

const productSave=async(req, res)=>{  
    const imageUrls = req.files.map(file => file.path);
    const {name, brand, price, description, category, subcategory } =req.body;
      
    const Product= await ProductModel.create({
        name:name,
        brand:brand,
        price:price, 
        description:description, 
        category:category, 
        subcategory:subcategory,
        images:imageUrls,
        defaultImage:imageUrls[0]
    })

    res.status(200).send("Product Succesfully Uploaded!");
}

const productDisplay=async(req, res)=>{
    try {
         const Data= await ProductModel.find();
         res.status(200).send(Data);
    } catch (error) {
        console.log(error);
    }
}

const productMakePrimary=async(req, res)=>{
    const {id} = req.body;
    const Data= await ProductModel.findByIdAndUpdate(id, {status:"primary"} );
    res.status(201).send({msg:"Product Status Succesfully Changed!"});
}

const productMakeNormal=async(req, res)=>{
    const {id} = req.body;
    const Data= await ProductModel.findByIdAndUpdate(id, {status:"normal"} );
    res.status(201).send({msg:"Product Status Succesfully Changed!"});
}

const showCustomerOrder=async(req, res)=>{
    const Order= await CustomerorderModel.find();
    res.status(200).send(Order);
}

const displayAllCustomer=async(req, res)=>{
       const Customer= await CustomerModel.find();
       res.status(200).send(Customer);
}

module.exports={
    productSave,
    productDisplay,
    productMakePrimary,
    productMakeNormal,
    showCustomerOrder,
    displayAllCustomer
}