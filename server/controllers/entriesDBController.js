import db from '../models/diaryDB';

export default function getAllEntry(req, res) {
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