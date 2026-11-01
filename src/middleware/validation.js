const { body, validationResult } = require("express-validator");

const internshipValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 150 })
    .withMessage("Title must not exceed 150 characters"),

  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company is required")
    .isLength({ max: 150 })
    .withMessage("Company must not exceed 150 characters"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("skills")
    .isArray({ min: 1 })
    .withMessage("Skills must be a non-empty array"),

  body("stipend")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stipend must be a non-negative integer"),

  body("duration")
    .optional()
    .isString()
    .withMessage("Duration must be a string"),

  body("type")
    .optional()
    .isString()
    .withMessage("Type must be a string"),

  body("application_url")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Application URL must be a valid URL")
];


const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }))
    });
  }

  next();
};


module.exports = {
  internshipValidation,
  validateRequest
};