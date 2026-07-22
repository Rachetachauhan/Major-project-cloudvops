const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        taskname : {
            type : String,
            required : true,
            trim : true,
            minlength : 3
        },
        description : {
            type : String,
            required : true,
            trim : true,
            minlength : 3
        },
        date : {
            type : Date,
            required : true,
            trim : true,
            required : true
        },
        priority : {
            type : String,
            enum : ["high", "medium", "low"],
            default : "medium",
            required : true
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },

        assigned: {
            type: String,
            trim: true
        },

        category: {
            type: String,
            enum: ["work", "study", "personal", "other"],
            default: "other"
        },

        reminder: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Task", taskSchema);

