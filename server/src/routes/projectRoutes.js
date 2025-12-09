const express = require('express');
const adminMiddleware = require("../middleware/adminMiddleware");
const { getProjects, addProject,deleteProject } = require('../controllers/projectController');
const {register,login} = require('../controllers/authenticate');
const router = express.Router();
router.post('/register',register);
router.post('/login',login);

router.get('/', getProjects);
router.post('/',adminMiddleware, addProject);
router.delete('/:id',adminMiddleware, deleteProject);
module.exports = router;