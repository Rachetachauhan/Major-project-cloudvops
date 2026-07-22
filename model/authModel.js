const mongoose = require("mongoose")

const authSchema = mongoose.Schema(
    {
        fullname : {
            type : String,
            required : true,
            minlength : 3,
            trim : true
        },
        username : {
            type : String,
            required : true,
            unique : true,
            trim : true
        },
        email : {
            type : String,
            required : "true",
            match : /@/,
            unique : true,
            trim : true
        },
        mobile : {
            type :String,
            required : true,
            unique : true,
            trim : true
        },
        password : {
            type :String,
            minlength : 8,
            trim : true
        },
        gender : {
            type : String,
            enum : ["male", "Female", "Other"]
        }

    },
    {timestamps : true}
)



const Auth = mongoose.model("Auth", authSchema)

module.exports = Auth;