const express = require("express");

const {
    createApplication,
    getAllApplications
} = require("../controllers/applicationController");

const {
    applicationValidation,
    validateApplication
} = require("../middleware/applicationValidation");

const router = express.Router();

router.get(
    "/",
    getAllApplications
);

router.post(
    "/",
    applicationValidation,
    validateApplication,
    createApplication
);

module.exports = router;