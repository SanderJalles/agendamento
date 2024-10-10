// src/app.ts

import express from 'express';
import Routes from './routes/Routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', Routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
