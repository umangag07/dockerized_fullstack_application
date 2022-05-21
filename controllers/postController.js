const Post = require("../models/postModel")

exports.getAllPost = async (req,res,next)=>{
    
    try{    
        const allPosts = await Post.find(); 
        res.status(200).send({
            message:"success",
            data:allPosts
        })
    }catch(e){
        console.log(e);
        res.status(400).send({
            message:"fail"
        })
    }
}

exports.getOnePost = async(req,res,next)=>{
    try{
        const singlePost = await Post.findById(req.params.id);
        res.status(200).send({
            message:"success",
            data:singlePost
        })
    }catch(e){
        console.log(e);
        res.status(400).send({
            message:"fail"
        }) 
    }

}

exports.createPost = async(req,res,next)=>{
    try{
        console.log(req.body)
        const response = await Post.create(req.body)
        res.status(200).send({
            message:"success",
            data:response
        })

    }catch(e){
        console.log(e);
        res.status(400).send({
            message:"fail"
        })  
    }
}

exports.patchPost = async(req,res,next)=>{
    try{
        const response = await Post.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send({
            message:"success",
            data:response
        })

    }catch(e){
        console.log(e);
        res.status(400).send({
            message:"fail"
        })  
    }
}

exports.deletePost = async(req,res,next)=>{
    try{
        const response = await Post.findByIdAndDelete(req.params.id)
        res.status(200).send({
            message:"success",
            data:response
        })

    }catch(e){
        console.log(e);
        res.status(400).send({
            message:"fail"
        })  
    }
}

