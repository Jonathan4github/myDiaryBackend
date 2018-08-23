import express from 'express';
import { getEntries, getSpecificEntry } from '../controllers/entriesController';

const router = express.Router();

router.route('/entries/')
  .get(getEntries);

router.route('/entries/:entryId/')
  .get(getSpecificEntry);

export default router;
