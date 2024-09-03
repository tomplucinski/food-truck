import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Here is some data', data: [1, 2, 3, 4, 5] });
});

app.post('/api/submit', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}! Your data has been received.` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
