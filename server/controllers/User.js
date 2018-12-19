import db from '../models/diaryDB';
import moment from 'moment';
import Helper from '../controllers/Help';
// import uuid from 'uuid';

class UserController {
  /**
   * @param {obj} req
   * @param {obj} res
   * @memberof UsersController
   * @returns {obj} insertion error messages or success message
   */
  signUp(req, res) {
    const { fullname, email, password } = req.body;
    const hashPassword = Helper.hashPassword(password);

    const createQuery =
      'INSERT INTO users (fullname, email, password, created_date, modified_date)  VALUES($1, $2, $3, $4, $5) returning *';
    const values = [fullname, email, hashPassword, moment(new Date()), moment(new Date())];

    db.query(createQuery, values, (error, user) => {
      if (error) {
        return res.status(500).json({
          status: 'Failed',
          message: error
        });
      }
      const token = Helper.generateToken(user.rows[0].id);
      req.token = token;
      return res.status(201).json({
        status: 'Success',
        message: 'Sign up Sucessfully',
        token
      });
    });
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const text = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(text)
      .then(user => {
        if (user.rows[0]) {
          const isPassword = Helper.comparePassword(user.rows[0].password, password);
          if (isPassword) {
            const token = Helper.generateToken(user.rows[0].id);
            req.token = token;
            return res.status(200).json({
              status: 'Success',
              message: 'Sucessful login',
              data: {
                id: user.rows[0].id,
                fullname: user.rows[0].fullname,
                email: user.rows[0].email
              },
              token
            });
          }
        }
        return res.status(401).json({
          status: 'Fail',
          message: 'The credentials you provided is incorrect'
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
  }
}

export default new UserController();
