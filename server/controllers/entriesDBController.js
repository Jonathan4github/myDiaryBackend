import db from '../models/diaryDB';
import uuid from 'uuid';
import moment from 'moment';


function getAllEntry(req, res) {
  db.query('SELECT * FROM entries where userId = $1',[req.user.id], (err, result) => {
    if (err) {
      return res.status(500)
      .json({
        status: 'Failed',
        message: err.message
      });
    }
    if ((result.rows).length < 1){
      return res.status(200)
      .json({
        status: 'Success',
        message: 'No entry has been entered'
      });
    }
    return res.status(200)
    .json({
      status:'Success',
      message: 'Entries retrieve successfully',
      entries: result.rows, 
      rowCount: result.rowCount
    });
  });
}

function getEntry(req, res){
  const entryId = req.params.entryId;
  const sql = 'SELECT * FROM entries WHERE id = $1 and userId = $2'
  const params = [entryId, req.user.id];
  db.query(sql, params, (err, result) =>{
    if ((err) && (err.message).slice(0, 30) === 'invalid input syntax for uuid:'){
      return res.status(404)
      .json({
        status: 'Failed',
        message: 'Please enter a valid entry id (uuid)'
      });
    }
    if (err){
      return res.status(500)
      .json({
        status: 'Failed',
        message: err.message
      });
    }
    if (result.rowCount === 0){
      return res.status(404)
      .json({
        status: 'Failed',
        message: 'Entry with the given id not found'
      });
    }
    return res.status(200)
    .json({
      status:'Success',
      message: 'Entry retrieve successfully',
      entries: result.rows
    });
  });
}


function addEntry(req, res) {
  const { title, entry } = req.body;
  const sql = 'INSERT INTO entries(id, title, entry, userId, created_date, modified_date) VALUES ($1, $2, $3, $4, $5, $6)';
  const params = [uuid.v4(), title, entry, req.user.id, moment(new Date()), moment(new Date())];

  db.query(sql, params);
  return res.status(201)
    .json({
      status: 'success',
      message: 'entry created successfully'
    });
}

function updateEntry(req, res) {
  const { title, entry } = req.body,
    { entryId } = req.params;
  const sql = 'UPDATE entries SET title = $1, entry = $2, modified_date = $3 WHERE id = $4';
  const params = [title, entry,  moment(new Date()), entryId];

  db.query(sql, params, (err, result)=>{
    if ((err) && (err.message).slice(0, 30) === 'invalid input syntax for uuid:'){
      return res.status(404)
      .json({
        status: 'Failed',
        message: 'Please enter a valid entry id (uuid)'
      });
    }
    if (err){
      return res.status(500)
      .json({
        status: 'Failed',
        message: err.message
      });
    }
    if (result.rowCount === 0){
      return res.status(404)
      .json({
        status: 'failed',
        message: 'Entry with the given id not found'
      });
    }
    return res.status(200)
    .json({
      status: 'Success',
      message: 'entry updated successfully'
    });
  });
}
 
  

function deleteEntry(req, res){
  const entryId = req.params.entryId;
  const sql = 'DELETE FROM entries WHERE id = $1';
  const params = [entryId];
  
  db.query(sql, params, (err, result)=>{
    if ((err) && (err.message).slice(0, 30) === 'invalid input syntax for uuid:'){
      return res.status(404)
      .json({
        status: 'Failed',
        message: 'Please enter a valid entry id (uuid)'
      });
    }
    if (err){
      return res.status(500)
      .json({
        status: 'failed',
        message: err.message
      });
    }
    if (result.rowCount === 0){
      return res.status(404)
      .json({
        status: 'failed',
        message: 'Entry with the given id not found'
      });
    }
    return res.status(200)
    .json({
      status:'success',
      message:'Entry delete successfully'
    });
  });

}

export {getAllEntry, getEntry, addEntry, updateEntry, deleteEntry};