const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoute")
const session = require("express-session")
const redis = require("redis")
const RedisStore = require("connect-redis")(session)
const redisClient = redis.createClient({
    host:REDIS_URL,
    port:REDIS_PORT
})

// redisClient.connect()
//     .then(()=>{
//     console.log("Conneced to redis successfully")
//     })
//     .catch(console.error)

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors({}))
app.enable("trust-proxy") //necessary if we want to get the ip address from the proxy 
app.use(session({
    store:new RedisStore({client:redisClient}),
    secret:SESSION_SECRET,
    cookie:{
        secure:false,
        resave:false,
        saveUninitialized: false,
        httpOnly:true,
        maxAge:30000, // in milliseconds
    }
}))

app.get('/api',(req,res)=>{
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