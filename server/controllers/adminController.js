const ProductModel= require("../models/productModel");


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


module.exports={
    productSave
}