"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const venta_1 = __importDefault(require("./routes/venta"));
const producto_1 = __importDefault(require("./routes/producto"));
const cors = require('cors');
const server = new server_1.default();
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Cors
server.app.use(cors({ origin: true, credentials: true }));
//Rutas de mi App
server.app.use('/user', usuario_1.default);
server.app.use('/venta', venta_1.default);
server.app.use('/producto', producto_1.default);
//Conectar DB
//mongoose.connect('mongodb://localhost:27017/fotosgram')
//mongoose.connect('mongodb://localhost:27017/zap')
//mongoose.connect('mongodb://localhost:27017/puntoVenta')
mongoose_1.default.connect('mongodb://localhost:27017/Bicicletas');
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
