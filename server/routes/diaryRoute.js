import express from 'express';
import {
  getEntries, getSpecificEntry, addEntry, updateEntry
} from '../controllers/entriesController';
import validateEntry from '../middleware/validateEntry';

const router = express.Router();

router.route('/entries/')
  .get(getEntries)
  .post(validateEntry, addEntry);

router.route('/entries/:entryId/')
  .get(getSpecificEntry)
  .put(validateEntry, updateEntry);

export default router;
