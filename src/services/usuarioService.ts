import { usuario } from '../models/usuarioModel';
import db from './db'; // Importando a instância do pool

export class UsuarioService {
  async getAllUsuarios(): Promise<usuario[]> {
    const client = await db.connect();
    try {
      const result = await client.query('SELECT * FROM "SISDAG"."usuario"'); // Adicionando o schema
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getUsuarioById(id_usuario: number): Promise<usuario | undefined> {
    const client = await db.connect();
    try {
      const result = await client.query('SELECT * FROM "SISDAG"."usuario" WHERE id_usuario = $1', [id_usuario]); // Adicionando o schema
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async createUsuario(usuario: usuario): Promise<usuario> {
    const client = await db.connect();
    try {
      const result = await client.query(
        'INSERT INTO SISDAG.usuario (nome, email, id_perfil, status_usuario, id_unidade_secretaria, sobrenome, celular, senha, cpf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [usuario.nome, usuario.email, usuario.id_perfil, usuario.status_usuario, usuario.id_unidade_secretaria, usuario.sobrenome, usuario.celular, usuario.senha, usuario.cpf]
      ); // Adicionando o schema
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateUsuario(id_usuario: number, usuarioData: Partial<usuario>): Promise<usuario | null> {
    const client = await db.connect();
    try {
      const result = await client.query(
        'UPDATE usuario SET nome = $1, email = $2, id_perfil = $3, status_usuario = $4, id_unidade_secretaria = $5, sobrenome = $6, celular = $7, senha = $8, cpf = $9 WHERE id_usuario = $10 RETURNING *',
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
      ); // Adicionando o schema
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async deleteUsuario(id_usuario: number): Promise<boolean> {
    const client = await db.connect();
    try {
      const result = await client.query('DELETE FROM "SISDAG"."usuario" WHERE id_usuario = $1', [id_usuario]); // Adicionando o schema
      return result && result.rowCount !== null && result.rowCount > 0;
    } finally {
      client.release();
    }
  }
}
