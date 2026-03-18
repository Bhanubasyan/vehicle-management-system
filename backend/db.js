const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Bhanu1012:Bhanu%401012@inventorydashboard.hvkbc4r.mongodb.net/inventoryDB?retryWrites=true&w=majority");
    console.log("MongoDB Connected ");
  } catch (error) {
    console.log("Error ❌", error);
  }
};

module.exports = connectDB;