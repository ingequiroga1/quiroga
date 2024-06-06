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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
var Producto = require('../models/producto.model');
exports.producto_lista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield Producto.find({}).sort({ articulo: 1 }).exec();
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos' });
        }
        res.json(results);
    }
    catch (error) {
        res.json(error);
    }
});
exports.producto_create = [
    (0, express_validator_1.check)('clave').notEmpty().withMessage('El campo clave es obligatorio').trim(),
    (0, express_validator_1.check)('articulo').notEmpty().isNumeric().trim(),
    (0, express_validator_1.check)('descripcion').isLength({ min: 1 }).trim(),
    (0, express_validator_1.check)('precio').isNumeric().trim(),
    (0, express_validator_1.check)('existencia').isNumeric().trim(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const resuladosVal = (0, express_validator_1.validationResult)(req);
        const errors = (0, express_validator_1.validationResult)(req);
        var nuevoProducto = new Producto({
            clave: req.body.clave,
            articulo: req.body.articulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            linea: req.body.linea,
            existencia: req.body.existencia,
            marca: req.body.marca
        });
        if (!errors.isEmpty()) {
            res.send({ errors: errors.array() });
            return;
        }
        else {
            const results = yield Producto.findOne({ clave: nuevoProducto.clave }).exec();
            if (results) {
                return res.status(404).json({ msg: 'Clave de producto ya existe' });
            }
            else {
                const resu = yield nuevoProducto.save();
                console.log(resu);
                res.json({ msg: 'Se creo el producto' });
            }
        }
    })
];
exports.producto_getUltimoArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ultimo = yield Producto.findOne().sort({ articulo: -1 }).select('articulo').exec();
        res.json({ lastId: ultimo.articulo });
    }
    catch (err) {
        res.json(err);
    }
});
exports.producto_getDetalleProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resultadoProducto = {
        exitoso: false,
        resultado: {}
    };
    try {
        const results = yield Producto.findById(req.params.id)
            .exec();
        if (!results) {
            const error = new Error('Producto no encontrado');
            resultadoProducto.resultado = error;
            return res.json(resultadoProducto);
        }
        resultadoProducto.resultado = results;
        resultadoProducto.exitoso = true;
        res.json(resultadoProducto);
    }
    catch (error) {
        res.json(resultadoProducto);
    }
});
exports.producto_updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resultadoUpdate = {
        exitoso: false,
        resultado: {}
    };
    try {
        const results = yield Producto.findById(req.body.id).exec();
        if (!results) {
            const error = new Error('Producto no encontrado');
            resultadoUpdate.resultado = error;
            return res.json(resultadoUpdate);
        }
        else {
            const resultUpdate = yield Producto.updateOne({ _id: req.body.id }, { $set: { clave: req.body.clave, descripcion: req.body.descripcion,
                    precio: req.body.precio, linea: req.body.linea, existencia: req.body.existencia, marca: req.body.marca } });
            resultadoUpdate.exitoso = true;
            resultadoUpdate.resultado = resultUpdate;
            console.log(resultadoUpdate);
            res.json(resultadoUpdate);
        }
    }
    catch (error) {
        res.json(resultadoUpdate);
    }
});
exports.producto_updateExistenciaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resultadoUpdate = {
        exitoso: false,
        resultado: {}
    };
    let idArticulo = req.body.articulo;
    try {
        const results = yield Producto.findOne({ articulo: idArticulo }).exec();
        if (!results) {
            const error = new Error('Producto no encontrado');
            resultadoUpdate.resultado = error;
            return res.json(resultadoUpdate);
        }
        else {
            let descontar = 1;
            let existenciaActualizada;
            if (req.body.tipo == descontar) {
                existenciaActualizada = results.existencia - req.body.cantidad;
            }
            else {
                existenciaActualizada = results.existencia + req.body.cantidad;
            }
            const resultUpdate = yield Producto.updateOne({ articulo: req.body.articulo }, { $set: { existencia: existenciaActualizada } });
            resultadoUpdate.exitoso = true;
            resultadoUpdate.resultado = resultUpdate;
            res.json(resultadoUpdate);
        }
    }
    catch (error) {
        res.json(resultadoUpdate);
    }
});
