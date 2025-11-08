const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { studentValidationRules } = require('../middleware/studentValidator');

router.post('/login',authController.login);
router.get('/session', authController.getSession);
router.get('/sclass', authController.getClass);
router.get('/students',authController.getStudent);
router.post('/students/add',studentValidationRules,authController.add);
router.get('/students/edit/:id',authController.editstudent);
router.put('/students/:id',authController.updatestudent);
router.post('/logout', authController.logout);

module.exports=router;