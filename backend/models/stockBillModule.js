import { Schema, model } from "mongoose";

const StockSchema = new Schema({
     costmername: { type: String, required: true },
     contact: { type: String, required: true },
     item: { type: String, required: true },
     quantity: { type: Number, required: true },
    tolalprice : { type: Number, required: true },
    paymentstatus: { type: String, required: true },
    Balanceamount: { type: Number, required: false },

});
export default model("Bill", StockSchema);

