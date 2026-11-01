const pool = require("../config/db");

// GET all internships with pagination
const getAllInternships = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      100
    );

    const offset = (page - 1) * limit;

    const countResult = await pool.query(
      "SELECT COUNT(*) FROM internships"
    );

    const total = parseInt(countResult.rows[0].count);

    const result = await pool.query(
      `SELECT *
       FROM internships
       ORDER BY id
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error("Get internships error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch internships"
    });
  }
};


// GET internship by ID
const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM internships WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Get internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch internship"
    });
  }
};


// CREATE internship
const createInternship = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      skills,
      stipend,
      duration,
      type,
      application_url
    } = req.body;

    const result = await pool.query(
      `INSERT INTO internships
      (
        title,
        company,
        location,
        description,
        skills,
        stipend,
        duration,
        type,
        application_url
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        title,
        company,
        location,
        description,
        skills,
        stipend || 0,
        duration,
        type || "Internship",
        application_url
      ]
    );

    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Create internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create internship"
    });
  }
};


// UPDATE internship
const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      company,
      location,
      description,
      skills,
      stipend,
      duration,
      type,
      application_url
    } = req.body;

    const result = await pool.query(
      `UPDATE internships
       SET
         title = $1,
         company = $2,
         location = $3,
         description = $4,
         skills = $5,
         stipend = $6,
         duration = $7,
         type = $8,
         application_url = $9,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [
        title,
        company,
        location,
        description,
        skills,
        stipend || 0,
        duration,
        type,
        application_url,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Update internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update internship"
    });
  }
};


// DELETE internship
const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM internships WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Delete internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete internship"
    });
  }
};


module.exports = {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship
};