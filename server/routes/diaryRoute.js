import express from 'express';
import  {getAllEntry, addEntry} from '../controllers/entriesDBController';
import validateEntry from '../middleware/validateEntry';

const router = express.Router();

router.route('/entries/')
  .get(getAllEntry)
  .post(validateEntry, addEntry);
  
export default router;
