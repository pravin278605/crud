const express         = require('express');
const router          = express.Router();
const authController  = require('../controllers/authController');
const { studentValidationRules } = require('../middleware/studentValidator');
const { loginValidation } = require('../middleware/loginValidation');

const multer          = require('multer');
const path            = require('path');

router.post('/login',loginValidation,authController.login);
router.get('/session',authController.getSession);
router.get('/sclass',authController.getClass);
router.get('/students',authController.getStudent);
router.delete("/students/:id", authController.deleteStudent);

//router.get('/document',authController.upload);

router.post('/students/add',studentValidationRules,authController.add);
router.get('/students/edit/:id',authController.editstudent);
router.put('/students/:id',authController.updatestudent);
router.post('/logout',authController.logout);

//router.post('/document/add',authController.addDocument);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // folder to save files
  },
  filename: (req, file, cb) => {
    // rename file to avoid collisions
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File upload filter (optional)
const fileFilter = (req, file, cb) => {
  const allowed = ['.png', '.jpg', '.jpeg', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDFs allowed!'));
  }
};
// Initialize multer
const upload = multer({ storage, fileFilter });

// Route for single file upload
router.post('/document/add', upload.single('file'), authController.uploadFile);
//router.post('/document/add',authController.addDocument);

module.exports=router;