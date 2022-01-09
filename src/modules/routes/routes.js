const express = require('express');
const router = express.Router();

const {
  createNewReseption
} = require('../controllers/reseption.controllers');

router.post('/createReseption', createNewReseption);

module.exports = router;