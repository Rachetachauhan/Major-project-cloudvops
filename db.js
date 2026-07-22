const mongoose = require('mongoose')

const connectingMongo = async ()=>{

    try{
        await mongoose.connect("mongodb+srv://racheta:Rach000chauhan@cluster0.ccc5rlr.mongodb.net/?appName=Cluster0");
        console.log("CONNECTED WITH MONGOdb")
    }
    catch(e){
        console.log("Failed to connect mongoDb");
        process.exit(1)
    }
}

module.exports = connectingMongo