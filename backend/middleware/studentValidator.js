const { body } = require('express-validator');
exports.studentValidationRules = [
      body('roll_no').notEmpty().withMessage('Roll number is required.'),
      body('class_id').notEmpty().withMessage('Please select course.'),
      body('first_name')
      .notEmpty().withMessage('First name is required.')
      .isLength({ min: 3 }).withMessage("Min 3 characters"),
      body('last_name').notEmpty().withMessage('Last name is required.'),
      body('gender').notEmpty().withMessage('Please select Gender.'),

];