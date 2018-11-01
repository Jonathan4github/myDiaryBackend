import db from '../models/diaryDB';
import moment from 'moment';
import uuid from 'UUID';
import Helper from '../controllers/Help';

class UserController{
    /**
   * @param {obj} req
   * @param {obj} res
   * @memberof UsersController
   *  @returns {obj} insertion error messages or success message
   */
  signUp(req, res){
    const {fullname, email, password} = req.body;
    const hashPassword = Helper.hashPassword(password);

    db.query(`SELECT id FROM users WHERE email = '${email}'`)
      .then((userfound)=>{
        if(userfound.rows.length > 0){
          return res.status(409)
            .json({
              status:'Failed',
              message: 'User with the given EMAIL already exist'
            });
        }
      });

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
            return res.status(201)
              .send({token});
          }).catch(err => res.status(500).json({
            status: 'Failed',
            message: err.message
          }));      
  }
}

export default new UserController();