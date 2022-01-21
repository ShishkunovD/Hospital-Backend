const express = require('express');
const router = express.Router();

const {
  getAllReseption,
  createNewReseption,
  updateReseption
} = require('../controllers/reseption.controllers');

router.get('/getAllReseption', getAllReseption);
router.post('/createReseption', createNewReseption);
router.patch('/updateReseption', updateReseption);

module.exports = router;