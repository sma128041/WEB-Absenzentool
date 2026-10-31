import express from 'express';
import faecherRouter from './routes/faecher.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/faecher', faecherRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});