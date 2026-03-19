require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Vehicle = require("./models/Vehicle");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// AUTH
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// VEHICLES
app.get("/api/vehicles", async (req, res) => {
const data = await Vehicle.find();
res.json(data);
});

app.post("/api/vehicles", async (req, res) => {
const newVehicle = new Vehicle(req.body);
await newVehicle.save();
res.json(newVehicle);
});

app.put("/api/vehicles/:id", async (req, res) => {
const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(updated);
});

app.delete("/api/vehicles/:id", async (req, res) => {
await Vehicle.findByIdAndDelete(req.params.id);
res.json({ msg: "Deleted" });
});

app.get("/", (req, res) => {
res.send("Server running...");
});

app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});
