const express = require('express');
const { getSubscribers, addSubscriber,deleteSubscriber } = require('../controllers/newsletterController');
const router = express.Router();

router.get('/', getSubscribers);
router.post('/', addSubscriber);
router.delete('/:id', deleteSubscriber);
module.exports= router;
