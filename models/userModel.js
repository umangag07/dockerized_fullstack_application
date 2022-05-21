const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"User must have"]
    },
    firstName:{
        type:String,
        required:[true,"User must have firstname"]
    }
    ,
    lastName:{
        type:String,
        required:[true,"User must have lastname"]
    },
    dob:{
        type:Date,
        required:[true,"User must have date of birth"]
    },
    email:{
        type:String,
        required:[true,'Email is mandatory for a user'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
}) 

const Schema = mongoose.model('user',userSchema)

module.exports = Schema