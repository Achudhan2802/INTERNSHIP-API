const pool = require("../config/db");

const createApplication = async (req, res) => {
    try {
        const {
            internship_id,
            name,
            email,
            portfolio
        } = req.body;

        const internshipResult = await pool.query(
            "SELECT id, title FROM internships WHERE id = $1",
            [internship_id]
        );

        if (internshipResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            });
        }

        const result = await pool.query(
            `INSERT INTO applications
            (internship_id, name, email, portfolio)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                internship_id,
                name,
                email,
                portfolio || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Create application error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit application"
        });
    }
};


// GET ALL APPLICATIONS
const getAllApplications = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                a.id,
                a.internship_id,
                a.name,
                a.email,
                a.portfolio,
                a.created_at,
                i.title AS internship_title,
                i.company,
                i.location,
                i.type
             FROM applications a
             JOIN internships i
                ON a.internship_id = i.id
             ORDER BY a.created_at DESC`
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error("Get applications error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch applications"
        });
    }
};


module.exports = {
    createApplication,
    getAllApplications
};