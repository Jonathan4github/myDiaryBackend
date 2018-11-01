import db from '../models/diaryDB';
import moment from 'moment';
import uuid from 'UUID';
import Helper from '../controllers/Help';

class UserController{
  /**
   * @param {obj} req
   * @param {obj} res
   * @memberof UsersController
   * @returns {obj} insertion error messages or success message
   */
  signUp(req, res){
    const {fullname, email, password} = req.body;
    const hashPassword = Helper.hashPassword(password);   

    const createQuery = `INSERT INTO
      users(id, fullname, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
      const values = [
        uuid.v4(),
        fullname,
        email,
        hashPassword,
        moment(new Date()),
        moment(new Date())
      ];

    db.query(createQuery, values)
       .then((user) =>{
         const token = Helper.generateToken(user.rows[0].id);
         req.token = token;
          return res.status(201)
            .json({
              status:'Success',
              message:'Sign up Sucessfully',
              token
            });
          }).catch(err => res.status(500).json({
            status: 'Failed',
            message: err.message
    }));      
  }

  signIn(req, res){
    const {email, password} = req.body;
    const createQuery = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(createQuery)
      .then((user) =>{
        if (user.rows[0]){
          const isPassword = Helper.comparePassword(user.rows[0].password, password);
          if(isPassword){
            const token = Helper.generateToken(user.rows[0].id);
            req.token = token;
            return res.status(200)
              .json({
                status:'Success',
                message:'Sucessful login',
                data:{
                  id:user.rows[0].id,
                  fullname:user.rows[0].fullname,
                  email:user.rows[0].email
                },
                token
              });
          }
        }
        return res.status(400)
            .json({
              status:'Fail',
              message:'The credentials you provided is incorrect'
        });
      }).catch((err) => {
        res.status(500)
          .json({
            status: 'Failed',
            message: err.message
          });
      });
  }
}

export default new UserController();