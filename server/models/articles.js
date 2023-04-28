import mongoose from "mongoose";
const ArticleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }, 
        address: {  
            type: String,   
            required: true
        },
        desc: {
            type: String,
            required: true,
        },
        jobs: [
            {
                workName: {
                    type: String,
                    required: true
                },
                days: {
                    type: String,
                    required: true
                },
                startDate: {
                    type: Date,
                    required: true
                },
                endDate: {
                    type: Date,
                    required: true
                },
                amountPaid:{
                  type:String,
                  required:true
                }
            }
        ]
        
    },
    { timestamps: true }
);

export default mongoose.model("articles", ArticleSchema);