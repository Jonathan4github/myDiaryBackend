import express from 'express';
import { getAllEntry, getEntry, addEntry, updateEntry, deleteEntry } from '../controllers/entriesDBController';
import validateEntry from '../middleware/validateEntry';
import validateUser from '../middleware/validateUser';
import UserController from '../controllers/User';
import Auth from '../middleware/Auth';

const router = express.Router();

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

export default router;
