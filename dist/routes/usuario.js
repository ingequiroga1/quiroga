"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = (0, express_1.Router)();
// userRoutes.get('/prueba',(req: Request,res: Response)=>{
//     res.json({
//         ok: true,
//         mensaje: 'todo funciona bien'
//     })
// });
//Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email })
        .then(userDB => {
        // return userDB;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario o contraseña no son correctos'
            });
        }
        if (userDB.CompararPassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario o contraseña no son correctos *****'
            });
        }
    }).catch(error => {
        throw error;
    });
});
//Crear un usuario
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUser
        });
        // res.json({
        //     ok: true,
        //     user: userDB
        // })
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Actualizar Usuario
userRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true })
        .then(userDB => {
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe usuario con ese id'
            });
        }
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch(error => {
        throw error;
    });
});
exports.default = userRoutes;
