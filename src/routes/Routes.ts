// src/routes/usuarioRoutes.ts

import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';

const router = Router();
const usuarioController = new UsuarioController();

// Rota para obter todos os usuários
router.get('/usuarios', usuarioController.getAllUsuarios.bind(usuarioController));
// Rota para obter um usuário pelo ID
router.get('/usuarios/:id_usuario', usuarioController.getUsuarioById.bind(usuarioController));
// Rota para criar um novo usuário
router.post('/usuarios', usuarioController.createUsuario.bind(usuarioController));
// Rota para atualizar um usuário existente
router.put('/usuarios/:id_usuario', usuarioController.updateUsuario.bind(usuarioController));
// Rota para deletar um usuário
router.delete('/usuarios/:id_usuario', usuarioController.deleteUsuario.bind(usuarioController));

export default router;
