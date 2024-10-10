import { Pool } from 'pg';

// Configurações da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',         // substitua pelo seu usuário
  host: '192.168.4.45',     // ou o IP do seu servidor
  database: 'Agendamento',      // substitua pelo seu banco de dados
  password: '123456',        // substitua pela sua senha
  port: 5432,                // porta padrão do PostgreSQL
});

// Exportando a instância do Pool
export default pool;
