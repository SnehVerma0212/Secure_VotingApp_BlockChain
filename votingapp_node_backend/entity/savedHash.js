import { N } from "ethers";
import mongoose from "mongoose";
const mongo = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    creationId:{
        type: Number,
        required: true,
        unique: true
    }
},{
    timestamps: true
    }
);

const dataUser = mongoose.model("savedHash", mongo);
export default dataUser;

// this is for test not the change in actuall code

