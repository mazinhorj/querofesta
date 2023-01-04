const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/serviceController');

router.route("/services").post((req, res) => serviceController.create(req, res));

module.exports = router;