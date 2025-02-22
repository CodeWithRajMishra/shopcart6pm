const ProductModel= require("../models/productModel");
const ProductRating = require("../models/proRatingModel");
const productDisplay=async(req, res)=>{
    try {
         const Product = await ProductModel.find({status:"primary"});
         res.status(200).send(Product);
    } catch (error) {
        console.log(error);
    }
}

const productAllDisplay=async(req, res)=>{
    const {id} = req.query;
    const Product = await ProductModel.findById(id);
    res.send(Product);
}

const productDisplaybyCat=async(req, res)=>{
    const {cate} = req.query;
    const Product = await ProductModel.find({category:cate});
    res.send(Product);
}

const productRatingSave=async(req, res)=>{
    const { ratings, name, userid} = req.body;

    const RateData = await ProductRating.find({userid:userid});
    console.log(RateData);
    if (RateData.length!=0)
    {
        res.status(401).send({msg:"You have alerady Rated this product"});
    }
    else
    {

    const rating = await ProductRating.create({
        userid:userid,
        name:name,
        rating:ratings
      })
      res.status(200).send(rating);
    }
    }


module.exports={
    productDisplay,
    productAllDisplay,
    productDisplaybyCat,
    productRatingSave
}