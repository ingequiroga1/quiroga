"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var producto_controller = require('../controllers/producto_controller');
const productoRoutes = (0, express_1.Router)();
//Obtener Productos
productoRoutes.get('/lista', producto_controller.producto_lista);
//Crear Producto
productoRoutes.post('/create', producto_controller.producto_create);
//Ultimo Articulo
productoRoutes.get('/ultimoArticulo', producto_controller.producto_getUltimoArticulo);
//Detalle producto
productoRoutes.get('/:id', producto_controller.producto_getDetalleProducto);
//Actualizar Producto
productoRoutes.put('/actualizar', producto_controller.producto_updateProducto);
//Descontar Existencias en producto
productoRoutes.post('/cambiarExistencia', producto_controller.producto_updateExistenciaProducto);
exports.default = productoRoutes;
