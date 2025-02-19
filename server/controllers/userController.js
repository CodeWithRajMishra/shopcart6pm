const UserModel= require("../models/userModel");
const jwt= require("jsonwebtoken");

const userRegister=async(req, res)=>{
    const {name, address, city, contact,  email, password, confirmPassword} = req.body;
    try {
         if (password!=confirmPassword)
         {
            res.status(401).send({msg:"password dose not match"})
         }

         const User = await  UserModel.create({
            name, 
            address, 
            city, 
            contact,  
            email, 
            password
         })
         res.status(200).send({msg:"user successfully registered!"});
    } catch (error) {
         console.log(error);
    }
}

const userLogin=async(req, res)=>{
    const { email, password} = req.body; 
    try {
        const User= await UserModel.findOne({email:email});
         
        if (!User)
        {
            res.status(400).send({msg:"Invalid Email"});
        }

        if (User.password!=password)
        {
            res.status(400).send({msg:"Invalid Password!"})
        }
    const token=await  jwt.sign({id:User._id}, process.env.JWT_SECRET, { expiresIn: '7 days'});   
    res.status(200).send({token:token});
    
    } catch (error) {
        console.log(error);
    }
}


const userProfile=async(req, res)=>{
    const token = req.header("Authorization");
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log(decoded);
    const User= await UserModel.findById(decoded.id);
    console.log(User);
    res.status(200).send(User);
}

const userDetailShow=async(req, res)=>{
    const {id} = req.body;
    console.log(req.body);
    const User = await UserModel.findById(id);
    res.status(200).send(User);
}

module.exports={
    userRegister,
    userLogin,
    userProfile,
    userDetailShow
}



