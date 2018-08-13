import entriesData from '../models/diary';

export default function getEntries(req, res) {
  return res.status(200)
    .json({
      status: 'Success',
      message: 'Entries retrieve successfully',
      entriesData
    });
}
