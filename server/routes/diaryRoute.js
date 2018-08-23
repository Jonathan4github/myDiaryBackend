import express from 'express';
import { getEntries, getSpecificEntry, addEntry } from '../controllers/entriesController';
import validateEntry from '../middleware/validateEntry';

const router = express.Router();

router.route('/entries/')
  .get(getEntries)
  .post(validateEntry, addEntry);

router.route('/entries/:entryId/')
  .get(getSpecificEntry);

export default router;
