const { body } = require('express-validator');
exports.studentValidationRules = [
      body('roll_no').notEmpty().withMessage('Roll number is required'),
      body('class_id').notEmpty().withMessage('Please select course.'),

];