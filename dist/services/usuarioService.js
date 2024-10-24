"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = __importDefault(require("../config/database"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query('SELECT * FROM "SISDAG"."usuario"');
    return result.rows;
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query('SELECT * FROM "SISDAG"."usuario" WHERE id_usuario = $1', [id]);
    return result.rows[0] || null;
});
exports.getUserById = getUserById;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular, cpf } = user;
    yield database_1.default.query('INSERT INTO "SISDAG"."usuario" (nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular,cpf) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11)', [nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular, cpf]);
});
exports.createUser = createUser;
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular, cpf } = user;
    yield database_1.default.query('UPDATE "SISDAG"."usuario" SET name = $1, email = $2, id_perfil = $3, status_usuario = $4, matricula = $5 WHERE id_usuario = $6, id_unidade_secretaria = $7, sobrenome = $8, senha = $9, celular = $10, cpf = $11', [nome, email, id_perfil, status_usuario, matricula, id_unidade_secretaria, sobrenome, senha, celular, cpf]);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query('DELETE FROM "SISDAG"."usuario" WHERE id_usuario = $1', [id]);
});
exports.deleteUser = deleteUser;
