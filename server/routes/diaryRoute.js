import express from 'express';
import { getAllEntry, getEntry, addEntry, updateEntry, deleteEntry } from '../controllers/entriesDBController';
import validateEntry from '../middleware/validateEntry';
import validateUser from '../middleware/validateUser';
import UserController from '../controllers/User';
import Auth from '../middleware/Auth';
import multipart from 'connect-multiparty';

const router = express.Router();
const multipartMiddleware = multipart();

router
  .route('/entries/')
  .get(Auth.verifyToken, getAllEntry)
  .post(Auth.verifyToken, validateEntry, addEntry);

router
  .route('/entries/:entryId')
  .get(Auth.verifyToken, getEntry)
  .put(Auth.verifyToken, validateEntry, updateEntry)
  .delete(Auth.verifyToken, deleteEntry);

router.route('/auth/signup/').post(validateUser.Signup, UserController.signUp);
router.route('/auth/signin/').post(validateUser.Signin, UserController.signIn);

router
  .route('/user/account/')
  .get(Auth.verifyToken, UserController.userAccount)
  .put(Auth.verifyToken, UserController.updateAccount);

router.route('/user/account/upload').put(Auth.verifyToken, multipartMiddleware, UserController.uploadImgae);

export default router;
