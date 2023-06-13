const express = require('express');
const router = express.Router();
const formController = require("./controllers/formCotroller")

router.post('/createForm', formController.createForm) 


module.exports = router;