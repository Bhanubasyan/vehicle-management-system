require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Vehicle = require("./models/Vehicle");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT;
// middleware
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// AUTH ROUTES IMPORT
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);



// GET all vehicles
app.get("/vehicles", async (req, res) => {
  try {
    const data = await Vehicle.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ADD vehicle
app.post("/vehicles", async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.json(newVehicle);
  } catch (err) {
    res.status(500).json({ error: "Error adding vehicle" });
  }
});

// UPDATE vehicle
app.put("/vehicles/:id", async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating vehicle" });
  }
});
// DELETE vehicle
app.delete("/vehicles/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ msg: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting vehicle" });
  }
});

// TEST route
app.get("/", (req, res) => {
  res.send("Server running...");
});


// START server
app.listen(PORT, () => {
  console.log("Server started on port ${PORT}");
});