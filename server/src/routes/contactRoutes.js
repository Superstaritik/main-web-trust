const express = require('express');
const { getContact, addContact,deleteContact }= require('../controllers/contactController');
const router = express.Router();

router.get('/', getContact);
router.post('/', addContact);
router.delete('/:id', deleteContact);
module.exports = router;
