import Helper from '../controllers/Help';
import validator from 'validator';
import db from '../models/diaryDB';

class UserValidation {
  Signup(req, res, next) {
    const { fullname, email, password } = req.body,
      errorMessage = {};

    if (fullname === undefined || password === undefined) {
      return res.status(400).json({
        message: 'All or some of the field is/are undefined'
      });
    }
    db.query(`SELECT id FROM users WHERE email = '${email}'`).then(userfound => {
      if (userfound.rows.length > 0) {
        return res.status(409).json({
          status: 'Failed',
          message: 'User with the given EMAIL already exist'
        });
      }
      if (!validator.isLength(fullname, { min: 5, max: 20 })) {
        errorMessage.fullname = 'Fullname must not be less than 5 characters or above 20';
      }
      if (!Helper.isValidEmail(email)) {
        errorMessage.email = 'Please enter a valid email';
      }
      if (!validator.isLength(password, { min: 7, max: 10 })) {
        errorMessage.password = 'password must not be less than 7 characters or above 10';
      }
      if (!(Object.keys(errorMessage).length === 0)) {
        return res.status(400).json(errorMessage);
      }
      return next();
    });
  }

  Signin(req, res, next) {
    const { email, password } = req.body,
      errorMessage = {};
    if (!Helper.isValidEmail(email)) {
      errorMessage.email = 'Please enter a valid email';
    }
    if (!validator.isLength(password, { min: 7, max: 10 })) {
      errorMessage.password = 'Please enter a valid password';
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(400).json(errorMessage);
    }
    return next();
  }
}

export default new UserValidation();
