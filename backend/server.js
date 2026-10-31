import express from 'express';
import faecherRouter from './routes/faecher.js';
import absenzenRouter from './routes/absenzen.js';
import benutzerRouter from './routes/benutzer.js';
import unterrichtRouter from './routes/unterricht.js';
import klassenRouter from './routes/klassen.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/faecher', faecherRouter);
app.use('/api/absenzen', absenzenRouter);
app.use('/api/benutzer', benutzerRouter);
app.use('/api/unterricht', unterrichtRouter);
app.use('/api/klassen', klassenRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});