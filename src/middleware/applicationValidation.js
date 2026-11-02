const {
    body,
    validationResult
} = require("express-validator");

const applicationValidation = [

    body("internship_id")
        .notEmpty()
        .withMessage("Internship ID is required")
        .isInt({ min: 1 })
        .withMessage("Internship ID must be a positive integer"),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage(
            "Name must be between 2 and 100 characters"
        ),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

    body("portfolio")
        .optional({ values: "falsy" })
        .isURL({
            protocols: ["http", "https"],
            require_protocol: true
        })
        .withMessage(
            "Portfolio must be a valid HTTP or HTTPS URL"
        )
];


const validateApplication = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }

    next();
};


module.exports = {
    applicationValidation,
    validateApplication
};