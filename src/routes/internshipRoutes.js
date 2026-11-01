const express = require("express");

const {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship
} = require("../controllers/internshipController");

const {
  internshipValidation,
  validateRequest
} = require("../middleware/validation");

const router = express.Router();


// GET /api/internships
router.get("/", getAllInternships);


// GET /api/internships/:id
router.get("/:id", getInternshipById);


// POST /api/internships
router.post(
  "/",
  internshipValidation,
  validateRequest,
  createInternship
);


// PUT /api/internships/:id
router.put(
  "/:id",
  internshipValidation,
  validateRequest,
  updateInternship
);


// DELETE /api/internships/:id
router.delete("/:id", deleteInternship);


module.exports = router;