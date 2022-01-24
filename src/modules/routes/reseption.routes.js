const express = require('express');
const router = express.Router();

const {
  getAllReseption,
  createNewReseption,
  updateReseption,
  deleteReseption
} = require('../controllers/reseption.controllers');

router.get('/getAllReseption', getAllReseption);
router.post('/createReseption', createNewReseption);
router.patch('/updateReseption', updateReseption);
router.delete('/deleteReseption', deleteReseption);

module.exports = router;