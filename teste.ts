import db from '../services/db'; // Caminho relativo para o arquivo db.ts

async function getUsuarios() {
  const client = await db.connect(); // Obtém uma conexão do pool
  try {
    const res = await client.query('SELECT * FROM "SISDAG"."usuario"');
    console.log(res.rows); // Exibe os resultados
  } finally {
    client.release(); // Libera a conexão
  }
}

getUsuarios().catch(console.error);
