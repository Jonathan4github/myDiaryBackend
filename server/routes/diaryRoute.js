import express from 'express';
import {
  getEntries, getSpecificEntry, addEntry, updateEntry, deleteEntry
} from '../controllers/entriesController';
import validateEntry from '../middleware/validateEntry';

const router = express.Router();

router.route('/entries/')
  .get(getEntries)
  .post(validateEntry, addEntry);

router.route('/entries/:entryId/')
  .get(getSpecificEntry)
  .put(validateEntry, updateEntry)
  .delete(deleteEntry);

export default router;
