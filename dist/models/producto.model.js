"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const format_number_1 = __importDefault(require("format-number"));
var ProductoSchema = new mongoose_1.Schema({
    clave: { type: String, require: true },
    articulo: { type: Number },
    descripcion: { type: String, required: true, max: 100 },
    precio: { type: Number },
    linea: { type: String, required: false },
    existencia: { type: Number },
    marca: { type: String }
});
ProductoSchema
    .virtual('url')
    .get(function () {
    return '/producto/' + this._id;
});
ProductoSchema
    .virtual('precio_formateado')
    .get(function () {
    return this.precio ? (0, format_number_1.default)({ prefix: '$' })(Number(this.precio)) : '0';
});
ProductoSchema
    .virtual('descripcion_art')
    .get(function () {
    return '@' + this.articulo + '|' + this.descripcion;
});
// ProductoSchema
// .virtual('descripcion_precio')
// .get(function () {
//   return '@' + this.articulo + '|' + this.descripcion + '     :' + this.precio_formateado;
// });
module.exports = (0, mongoose_1.model)('Producto', ProductoSchema);
