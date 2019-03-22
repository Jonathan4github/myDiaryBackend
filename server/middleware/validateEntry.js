import validator from 'validator';

export default function (req, res, next) {
  const { title, entry } = req.body,
    errorsMessage = {};

  // Catch errors for title entry field
  if ((title === undefined)) {
    errorsMessage.title = 'Title undefined. Title field is required';
  } else if (!(validator.isLength(title, { min: 4, max: 30 }))) {
    errorsMessage.title = 'Title Maximum character 30 and minmum 10';
  }

  // Catch errors entry field
  if ((entry === undefined)) {
    errorsMessage.entry = 'Entry undefined. Entry field is required';
  } else if (!(validator.isLength(entry, { min: 10, max: 1000 }))) {
    errorsMessage.entry = 'Entry minimum character 10 and maximum  1000';
  }


  if (!(Object.keys(errorsMessage).length === 0)) {
    return res.status(400)
      .json(errorsMessage);
  }

  return next();
}
