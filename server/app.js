import express from 'express';
import bodyParser from 'body-parser';
import entriesRoute from './routes/diaryRoute';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Welcome to "mydiary" An online journal'
    });
});

app.use('/api/v1', entriesRoute);
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Failed',
    message: 'Page not found'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
export default app;
