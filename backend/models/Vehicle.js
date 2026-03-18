const mongoose = require("mongoose");
 const vehicleSchema = new mongoose.Schema({
  make:String,
  model:String,
  year:Number,
   arrivalDate: {
    type: Date,
    default: Date.now
  }
 })

 module.exports = mongoose.model("Vehicle", vehicleSchema);
