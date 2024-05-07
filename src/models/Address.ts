import express from "express"
import mongoose from "mongoose"

interface addressModel {
    user: any;
    district: string,
    sector: string,
    strNo: string,
    houseNo?: string


}


const AddressModal = new mongoose.Schema<addressModel>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    district: {type: String,required:true},
    sector: {type:  String, required:true},
    strNo: {type: String, required:true},
    houseNo: {type: String, required:true}

})


const AddressModel =  mongoose.model("aaddress", AddressModal)
export default AddressModel