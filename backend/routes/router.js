const express = require('express');

const router = express.Router();

//Services router
const servicesRouter = ('./services');

router.use("/", (req, res, next) => {
  req.servicesRouter;
  next();
});

module.exports = router;