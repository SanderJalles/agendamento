import { Usuario } from '../models/usuarioModel';
import db from './db'; // Importando a instância do pool

export class UsuarioService {
  async getAllUsuarios(): Promise<Usuario[]> {
    const client = await db.connect();
    try {
      const result = await client.query('SELECT * FROM "Usuário"'); // Usando aspas duplas para o nome da tabela
      return result.rows; // `rows` é um array de usuários
    } finally {
      client.release();
    }
  }

  async getUsuarioById(id_usuario: number): Promise<Usuario | undefined> {
    const client = await db.connect();
    try {
      const result = await client.query('SELECT * FROM "Usuário" WHERE id_usuario = $1', [id_usuario]);
      return result.rows[0]; // Retorna o primeiro usuário ou undefined se não encontrado
    } finally {
      client.release();
    }
  }

  async createUsuario(usuario: Usuario): Promise<Usuario> {
    const client = await db.connect();
    try {
      const result = await client.query(
        'INSERT INTO "Usuário" (nome, email, id_perfil, status_usuario, id_unidade_secretaria, sobrenome, celular, senha, cpf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [usuario.nome, usuario.email, usuario.id_perfil, usuario.status_usuario, usuario.id_unidade_secretaria, usuario.sobrenome, usuario.celular, usuario.senha, usuario.cpf]
      );
      return result.rows[0]; // Retorna o usuário criado
    } finally {
      client.release();
    }
  }

  async updateUsuario(id_usuario: number, usuarioData: Partial<Usuario>): Promise<Usuario | null> {
    const client = await db.connect();
    try {
      const result = await client.query(
        'UPDATE "Usuário" SET nome = $1, email = $2, id_perfil = $3, status_usuario = $4, id_unidade_secretaria = $5, sobrenome = $6, celular = $7, senha = $8, cpf = $9 WHERE id_usuario = $10 RETURNING *',
        [
          usuarioData.nome,
          usuarioData.email,
          usuarioData.id_perfil,
          usuarioData.status_usuario,
          usuarioData.id_unidade_secretaria,
          usuarioData.sobrenome,
          usuarioData.celular,
          usuarioData.senha,
          usuarioData.cpf,
          id_usuario
        ]
      );
      return result.rows[0] || null; // Retorna o usuário atualizado ou null se não encontrado
    } finally {
      client.release();
    }
  }

  async deleteUsuario(id_usuario: number): Promise<boolean> {
    const client = await db.connect();
    try {
      const result = await client.query('DELETE FROM "Usuário" WHERE id_usuario = $1', [id_usuario]);
      // Verificação explícita para garantir que result e rowCount não são nulos
      return result && result.rowCount !== null && result.rowCount > 0; // Retorna true se um usuário foi deletado
    } finally {
      client.release();
    }
  }
}
