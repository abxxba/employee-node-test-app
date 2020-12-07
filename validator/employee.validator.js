const { check, validationResult } = require("express-validator");

exports.validate = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),

  check("dateOfBirth")
    .trim()
    .isDate()
    .not()
    .isEmpty()
    .withMessage("Invalid date of birth!")
    .bail(),

  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("gender can not be empty!")
    .bail(),

  check("salary")
    .trim()
    .isNumeric()
    .withMessage("salary must be number!")
    .not()
    .isEmpty()
    .withMessage("Invalid salary!")
    .bail(),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(500).json({ errors: errors.array() });
    next();
  },
];
