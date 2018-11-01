import Helper from '../controllers/Help';
import validator from 'validator';


    function Signup(req, res, next){
        /**
   * Create A User
   * @param {object} req 
   * @param {object} res   * 
   * @returns {object} signup object 
   */

   const {fullname, email, password} = req.body,
   errorMessage = {};

   if (!(validator.isLength(fullname, { min: 5, max: 20 }))) {
    errorMessage.fullanme = 'Fullname must not be less than 10 characters or above 30';
   }
   if (!(Helper.isValidEmail(email))){
       errorMessage.email = 'Please enter a valid email';
   }
   if (!(validator.isLength(password, { min: 7, max:10  }))) {
    errorMessage.fullanme = 'password must not be less than 7 characters or above 10';
   }
   if (!(Object.keys(errorMessage).length === 0)) {
    return res.status(400)
      .json(errorMessage);
  }
  return next();
  }

export default Signup;