import express from 'express';
import  {getAllEntry, getEntry, addEntry, updateEntry, deleteEntry} from '../controllers/entriesDBController';
import validateEntry from '../middleware/validateEntry';
import Signup  from '../middleware/validateUser';
import UserController from '../controllers/User';

const router = express.Router();

router.route('/entries/')
  .get(getAllEntry)
  .post(validateEntry, addEntry);

router.route('/entries/:entryId')
  .get(getEntry)
  .put(validateEntry, updateEntry)
  .delete(deleteEntry);

router.route('/signup/')
  .post(Signup, UserController.signUp);;

export default router;
