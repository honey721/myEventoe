import mongoose from "mongoose";

const ComSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    CIN_No:{
        type:String,
        required:true,
        unique:true
    }, 
    desc:{
        type:String,
        required:true
    },
    address: {
      type: String,
      required: true
    },
    work:[
        {
            workName:{
                type:String,
                required:true
            },
            days:{
                type:String,
                required:true
            },
            startDate:{
                type:Date,
                required:true
            },
            endDate:{
                type:Date,
                required:true 
            },
            amountPaid:{
              type:String,
              required:true
            }

        }
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("companies", ComSchema);