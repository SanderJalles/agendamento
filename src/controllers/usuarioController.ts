// src/controllers/usuarioController.ts

import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';

const usuarioService = new UsuarioService();

export class UsuarioController {
  async getAllUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await usuarioService.getAllUsuarios(); // Assumindo que esta função é assíncrona
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
  }

  async getUsuarioById(req: Request, res: Response): Promise<void> {
    const { id_usuario } = req.params;
    try {
      const usuario = await usuarioService.getUsuarioById(Number(id_usuario)); // Assumindo que esta função é assíncrona
      if (!usuario) {
        res.status(404).send('Usuário não encontrado');
        return;
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário', error });
    }
  }

  async createUsuario(req: Request, res: Response): Promise<void> {
    const usuarioData = req.body;
    try {
      console.log(req.body);
      const usuario = req.body;
      const novoUsuario = await usuarioService.createUsuario(usuarioData); // Assumindo que esta função é assíncrona
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }

  async updateUsuario(req: Request, res: Response): Promise<void> {
    const { id_usuario } = req.params;
    const usuarioData = req.body;
    try {
      const usuarioAtualizado = await usuarioService.updateUsuario(Number(id_usuario), usuarioData); // Assumindo que esta função é assíncrona
      if (!usuarioAtualizado) {
        res.status(404).send('Usuário não encontrado');
        return;
      }
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
  }

  async deleteUsuario(req: Request, res: Response): Promise<void> {
    const { id_usuario } = req.params;
    try {
      const deletado = await usuarioService.deleteUsuario(Number(id_usuario)); // Assumindo que esta função é assíncrona
      if (!deletado) {
        res.status(404).send('Usuário não encontrado');
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
  }
}
