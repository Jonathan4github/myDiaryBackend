import db from '../models/diaryDB';
import moment from 'moment';

/**
 * Crud controller for entry
 * 
 * Function to get User Entries
 * Authentication Required
 * @param{request} req
 * @param{response} res
 * @return{oject} return entries for user
 */
const getAllEntry = (req, res) => {
  db.query('SELECT * FROM entries where userId = $1', [req.user.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'Failed',
        message: err.message
      });
    }
    if (result.rows.length < 1) {
      return res.status(200).json({
        status: 'Success',
        message: 'No entry has been entered'
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: 'Entries retrieve successfully',
      entries: result.rows,
      rowCount: result.rowCount
    });
  });
}

/**
 * Function for to get User Entry
 * Authentication Required
 * @param {request} req 
 * @param {response} res
 * @return {object} return entry for user. 
 */
const getEntry = (req, res) => {
  const entryId = req.params.entryId;
  const sql = 'SELECT * FROM entries WHERE id = $1 and userId = $2';
  const params = [entryId, req.user.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'Failed',
        message: err.message
      });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Entry with the given id not found'
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: 'Entry retrieve successfully',
      entries: result.rows
    });
  });
}

/**
 * Functio for creating User Entry
 * Authentication Required
 * @param {request} req 
 * @param {response} res
 * @return {object} return add entry for user. 
 */
const addEntry = (req, res) => {
  const { title, entry } = req.body;
  const sql = 'INSERT INTO entries(title, entry, userId, created_date, modified_date) VALUES ($1, $2, $3, $4, $5)';
  const params = [title, entry, req.user.id, moment(new Date()), moment(new Date())];

  db.query(sql, params);
  return res.status(201).json({
    status: 'Success',
    message: 'entry created successfully'
  });
}

/**
 * Function for upadating User Entry
 * Authentication Required
 * @param {request} req 
 * @param {response} res 
 * @return {object} return update entry for user.
 */
const updateEntry = (req, res) => {
  const { title, entry } = req.body,
    { entryId } = req.params;
  const sql = 'UPDATE entries SET title = $1, entry = $2, modified_date = $3 WHERE id = $4';
  const params = [title, entry, moment(new Date()), entryId];

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'Failed',
        message: err.message
      });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'failed',
        message: 'Entry with the given id not found'
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: 'entry updated successfully'
    });
  });
}

/**
 * Function for deleting User Entry
 * @param {request} req 
 * @param {response} res
 * @return {object} return delete status. 
 */
const deleteEntry = (req, res) => {
  const entryId = req.params.entryId;
  const sql = 'DELETE FROM entries WHERE id = $1';
  const params = [entryId];

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: err.message
      });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'failed',
        message: 'Entry with the given id not found'
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Entry delete successfully'
    });
  });
}

export { getAllEntry, getEntry, addEntry, updateEntry, deleteEntry };
