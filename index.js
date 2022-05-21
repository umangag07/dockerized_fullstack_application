const express = require("express")
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express()

const port = process.env.PORT || 5000
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoute")
app.use(express.json())

app.get('/',(req,res)=>{
    console.log("/ path requested")
    res.send({"Message":"server is working with the bind mount volumes.!!!"})
})

app.use("/api/v1/posts",postRouter)
app.use("/api/v1/user",userRouter)

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    .then(()=>{
        console.log("Conneced to database successfully")
    })
    .catch((e)=>{
        console.log(e)
    })