//database connection
const mongoose=require('mongoose');
const dblink='mongodb+srv://admin:yhiawDzoR6q517G6@cluster0.y8iyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dblink)
.then(function(db){
    console.log("database connnected");
})
.catch(function(err){
    console.log(err);
})
//schema
const emailvalidator=require('email-validator');
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailvalidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
});
//encrypting password using moongoose pre hook
const bcrypt=require('bcrypt');
userschema.pre('save',async function(){
    let salt=await bcrypt.genSalt();  //generating salt
    let hashedstring=await bcrypt.hash(this.password,salt);
    this.password=hashedstring;
});
//schema model
const usermodel=mongoose.model('usermodel',userschema);
module.exports=usermodel;