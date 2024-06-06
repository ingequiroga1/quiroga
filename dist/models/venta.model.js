"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var moment = require('moment');
//const format = require('format-number');
const format_number_1 = __importDefault(require("format-number"));
const DetProducto = new mongoose_1.Schema({
    producto: { type: mongoose_1.Schema.ObjectId, ref: 'Producto' },
    cantidad: { type: Number },
    importe: { type: Number },
    medias: { type: Number },
    descripcion: { type: String }
});
DetProducto
    .virtual('importe_formateado')
    .get(function () {
    return this.importe ? (0, format_number_1.default)({ prefix: '$' })(Number(this.importe)) : '0';
    //return this.importe ? format({prefix:'$'})(Number(this.importe).toFixed(2)) : '0';
});
const VentaSchema = new mongoose_1.Schema({
    secuencia: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    capturista: { type: String, default: '' },
    total: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 },
    no_piezas: { type: Number, default: 0 },
    no_medias: { type: Number, default: 0 },
    productos: [DetProducto]
});
VentaSchema
    .virtual('url')
    .get(function () {
    return '/venta/' + this._id;
});
VentaSchema
    .virtual('fecha_formateada')
    .get(function () {
    return this.fecha ? moment(this.fecha).format('DD/MM/YYYY') : '';
});
VentaSchema
    .virtual('total_formateado')
    .get(function () {
    return this.total ? (0, format_number_1.default)({ prefix: '$' })(Number(this.total)) : '0';
});
VentaSchema
    .virtual('subtotal_formateado')
    .get(function () {
    return this.subtotal ? (0, format_number_1.default)({ prefix: '$' })(Number(this.subtotal)) : '0';
});
VentaSchema
    .virtual('descuento_formateado')
    .get(function () {
    return this.descuento ? (0, format_number_1.default)({ prefix: '$' })(Number(this.descuento)) : '0';
});
//   interface IVenta extends Document{
//     secuencia: Number,
//     fecha: Date,
//     capturista: String,
//     total: Number,
//     subtotal:Number,
//     descuento:Number, 
//     no_piezas:Number,
//     no_medias:Number, 
//     productos: typeof DetProducto
//   }
//   export const Venta = model<IVenta>('Usuario',VentaSchema);
//Export model
module.exports = (0, mongoose_1.model)('Venta', VentaSchema);
