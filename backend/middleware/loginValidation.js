const { body } = require("express-validator");
exports.loginValidation = [
  body("email")
    .notEmpty().withMessage("Enter Email Id")
    .bail()      
    .isEmail().withMessage("Enter valid email."),

  body("password")
    .notEmpty().withMessage("Enter the Password.")
    .bail()
    .isLength({ min: 5 }).withMessage("Password must be at least 5 chars")
];