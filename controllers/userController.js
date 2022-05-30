const User = require("../models/userModel")
const bcrypt = require("bcrypt")

exports.findAllUsers = async (req,res,next)=>{
    try{
        const allUsers = await User.find()
        res.status(200).send({
            message:"Success",
            data:allUsers
        })
    }catch(e){
        console.log(e);
        res.status(400).send({
            message:"failure",
        })
    }

}
exports.findSingleUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        console.log("User found by id",user)
        let status=200;
        let message="success";
        if(user==null){
           status = 404
           message = "Failure"
        }
       
        res.status(status).send({
            message:message,
            data:user?user:''
        })
    }catch(e){
        console.log(e);
        res.status(400).send({
            message:"failure",
        })
    }
}
exports.findUserByEmail = async (req,res,next)=>{
    try{
        console.log('findby email',req.body)
        const user = await User.findOne({
            email:req.body.email
        })
        if(user!=null){
            res.status(200).send({
                message:"Success",
                data:user
            })
        }
        res.status(404).send({
            message:"User with this email does not exist",
        })
    }catch(e){
        console.log(e);
        res.status(404).send({
            message:"failure",
        })
    }
}
exports.createUser = async(req,res,next)=>{
    try{
        let data = req.body
        console.log("Body sent to create user",data)
        let user_username = await User.findOne({userName:data.userName})
        if(! data.hasOwnProperty("password")){
            throw new Error("Password is not defined")
        }
        console.log("User found by username",user_username)
        if(user_username != null){
            throw new Error("Not a unique userName")
        }
        let user_email = await User.findOne({email:data.email})
        console.log("User found by email",user_email)

        if(user_email !=null){
            throw new Error("user with same email exist")
        }
        bcrypt.hash(data.password,10,async (err,hash)=>{
            if(err){
                console.log(err)
                throw new Error("Error in saving password")
            }
            data = {...data,password:hash};
            const response = await User.create(data);
            res.status(200).send({
                message:"Success",
                data:response
            })
        })
    }catch(e){
        console.log(e);
        res.status(400).send({
            message:e.message,
        })
    }
    
}
exports.updateUser = async(req,res,next)=>{
    try{
        const response = await User.findByIdAndUpdate(req.params.id,req.body)
        if(response!=null){
            res.status(200).send({
                message:"Success",
                data:response
            })
        }
        res.status(200).send({
            message:"User with this id is not there",
        })
    }catch(e){
        console.log(e);
        res.status(400).send({
            message:e.message,
        })
    }
   
}
exports.deleteUser = async(req,res,next)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(user!=null){
            res.status(200).send({
                message:"user deleted successfully",
                data:user
            }) 
        }
        res.status(404).send({
            message:"User doesn't exist with the Id",
        })
    }catch(e){
        console.log(e);
        res.status(400).send({
            message:e.message,
        })
    }
   
}
exports.login = async(req,res,next)=>{
    try{
        let data  = req.body
        const email = data.email
        const password = data.password
        if(email == undefined || password == undefined){
            throw new Error("Please define all the things")
        }
        let response = await User.findOne({email:email});
        if(response===null){
            throw new Error("Can't find the user in the database with this email")
        }
        bcrypt.compare(password, response.password, function(err, result) {
            if(err){
                console.log(err)
                throw new Error(err)
            }
            if(!result){
                console.log("Login unsuccessfull");
                return res.status(404).send({
                    message:"Login unsuccessfull"
                })
            }
            console.log("User logged in ")
            res.status(200).send({
                message:"Login successfull"
            })
        });
    }catch(e){
        console.log(e);
        res.status(400).send({
            message:e.message,
        })
    }
}