import pool from '../config/database';
import { User } from '../models/usuarioModel';

export const getUsers = async (): Promise<User[]> => {
  const result = await pool.query('SELECT * FROM "SISDAG"."usuario"');
  return result.rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM "SISDAG"."usuario" WHERE id_usuario = $1', [id]);
  return result.rows[0] || null;
};

export const createUser = async (user: User): Promise<void> => {
  const { nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular,cpf } = user;
  await pool.query(
    'INSERT INTO "SISDAG"."usuario" (nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular,cpf) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11)',
    [nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular,cpf]
  );
};

export const updateUser = async (id: number, user: User): Promise<void> => {
  const { nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular,cpf } = user;
  await pool.query(
    'UPDATE "SISDAG"."usuario" SET name = $1, email = $2, id_perfil = $3, status_usuario = $4, matricula = $5 WHERE id_usuario = $6, id_unidade_secretaria = $7, sobrenome = $8, senha = $9, celular = $10, cpf = $11',
    [nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular,cpf]
  );
};

export const deleteUser = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM "SISDAG"."usuario" WHERE id_usuario = $1', [id]);
};
