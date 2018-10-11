import db from '../models/diaryDB';
import uuid from 'uuid';
import moment from 'moment';


function getAllEntry(req, res) {
  db.query('SELECT * FROM entries', (err, result) => {
    if (err) {
      return res.json({
        message: 'Fail',
        error: err
      }).status(500);
    }
    if ((result.rows).length < 1){
      return res.json({
        status: 'Success',
        message: 'No entry has been entered'
      }).status(200);
    }
    return res.json({
      status:'Success',
      message: 'Entries retrieve successfully',
      entries: result.rows
    }).status(200);
  });
}

function addEntry(req, res) {
  const { title, entry } = req.body;
  const sql = 'INSERT INTO entries(id, title, entry, created_date, modified_date) VALUES ($1, $2, $3, $4, $5)';
  const params = [uuid.v4(), title, entry, moment(new Date()), moment(new Date())];

  db.query(sql, params);
  return res.status(201)
    .json({
      status: 'success',
      message: 'entry created successfully'
    });
}

export {getAllEntry, addEntry};