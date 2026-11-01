const express = require("express");
const cors = require("cors");
require("dotenv").config();

const internshipRoutes = require("./routes/internshipRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());

// ================================
// Health Check
// ================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Internship API is running",
  });
});

// ================================
// Internship Routes
// ================================

app.use("/api/internships", internshipRoutes);

// ================================
// 404 Handler
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ================================
// Global Error Handler
// ================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ================================
// Start Server
// ================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});