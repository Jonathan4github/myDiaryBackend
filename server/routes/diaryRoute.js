import express from 'express';
import entryController from '../controllers/entriesController';

const router = express.Router();

router.route('/entries/')
  .get(entryController);

export default router;
