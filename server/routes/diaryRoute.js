import express from 'express';
import  {getAllEntry, getEntry, addEntry, updateEntry} from '../controllers/entriesDBController';
import validateEntry from '../middleware/validateEntry';

const router = express.Router();

router.route('/entries/')
  .get(getAllEntry)
  .post(validateEntry, addEntry);

router.route('/entries/:entryId')
  .get(getEntry)
  .put(validateEntry, updateEntry);
  
export default router;
