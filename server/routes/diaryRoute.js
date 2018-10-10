import express from 'express';
import  getAllEntry from '../controllers/entriesDBController';

const router = express.Router();

router.route('/entries')
  .get(getAllEntry);
  
export default router;
