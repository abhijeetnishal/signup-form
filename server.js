const express=require('express');
const app=express();
//env
// const path=require('path');
app.use(express.static('./'));
app.get('*',(req,res)=>{
    res.sendFile('./index.html',{root:__dirname});
});
//creating port
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("server listening at port 5000");
});
app.use(express.json());
const usermodel=require('./model');
const authrouter=express.Router();
app.use('/auth',authrouter);
authrouter
.route('/signup')
.get(getuser)
.post(postuser);
function getuser(req,res){
    res.sendFile('./index.html',{root:__dirname});
};
async function postuser(req,res){
    let users=await usermodel.create(req.body); 
    console.log(users);
    res.json({
        message:"user signed up",
        data:req.body
    })
};