import entriesData from '../models/diary';

function getEntries(req, res) {
  return res.status(200)
    .json({
      status: 'Success',
      message: 'Entries retrieve successfully',
      entriesData
    });
}

function getSpecificEntry(req, res) {
  const entry = entriesData.find(e => e.id === parseInt(req.params.entryId, 10));
  if (!entry) {
    return res.status(404)
      .json({
        status: 'fail',
        message: 'The entry with the given ID was not found'
      });
  }
  return res.json(entry)
    .status(200);
}

function addEntry(req, res) {
  const { title, date, entry } = req.body;
  const newEntry = {
    id: entriesData.length + 1,
    title,
    date,
    entry
  };
  entriesData.push(newEntry);
  return res.status(201)
    .json({
      status: 'success',
      message: 'entry created successfully'
    });
}

export { getEntries, getSpecificEntry, addEntry };
