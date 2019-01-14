import db from '../models/diaryDB';
import moment from 'moment';
import Helper from '../controllers/Help';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

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

  userAccount(req, res) {
    const sql = `SELECT * FROM users WHERE id = '${req.user.id}'`;

    db.query(sql)
      .then(user =>
        res.status(200).json({
          status: 'Success',
          message: 'User account retrieve successfully',
          account: {
            id: user.rows[0].id,
            fullname: user.rows[0].fullname,
            email: user.rows[0].email,
            password: user.rows[0].password,
            reminder: user.rows[0].reminder,
            image: user.rows[0].image,
            created_date: user.rows[0].created_date,
            modified_date: user.rows[0].modified_date
          }
        })
      )
      .catch(err => {
        res.status(500).json({
          status: 'Failed',
          messsage: err.message
        });
      });
  }

  updateAccount(req, res) {
    const userId = req.user.id;
    const { fullname, email, password, reminder } = req.body;
    const hashPassword = Helper.hashPassword(password);
    const values = [fullname, email, hashPassword, reminder, userId];
    const sql = 'UPDATE users SET fullname= $1, email= $2, password= $3, reminder= $4 WHERE id=$5 RETURNING *';

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      }
      return res.status(200).json({
        status: 'Success',
        message: 'account updated successfully'
      });
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jo.mydiary@gmail.com',
        pass: 'jo.mydiary2019'
      }
    });

    // send mail at a periodic interval
    cron.schedule(`0 0 0 */${reminder} * *`, () => {
      console.log('---------- Running Cron Job --------');
      const firstName = fullname.split(' ')[0];
      const mailOptions = {
        from: 'jo.mydiary@gmail.com',
        to: `${email}`,
        subject: 'Start your day by writing',
        html: `<h1>myDiary</h1><p>Hi ${firstName},</p>
        <p>This is a quick email to remind you to write in your <strong>myDiary</strong> Journal!<br />
        Click the link below ---------------- to start a new entry.<br />You can <u>disable this reminder</u> or <u>manage all reminders for this journal</u>.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw error;
        } else {
          console.log('Email sent');
        }
      });
    });
  }

  uploadImgae(req, res) {
    cloudinary.uploader.upload(req.files.image.path, result => {
      const userId = req.user.id;
      db.query(`UPDATE users SET image ='${result.url}' WHERE id='${userId}' RETURNING image`)
        .then(user => {
          res.status(200).json({
            status: 'Success',
            imageUrl: user.rows[0].image
          });
        })
        .catch(err => console.log(err));
    });
  }
}

export default new UserController();
