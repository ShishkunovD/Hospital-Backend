const express = require('express');
const router = express.Router();

const {
  getAllReseption,
  createNewReseption
} = require('../controllers/reseption.controllers');

router.get('/getAllReseption', getAllReseption);
router.post('/createReseption', createNewReseption);

module.exports = router;