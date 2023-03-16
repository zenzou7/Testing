if (process.env.MODE != 'production') {
  require('dotenv').config();
}

let DAO;

switch (process.env.DB) {
  case 'MONGO':
    const daoMongoProductos = require('../src/service/DAO/daoMongoProductos.js');
    const daoMongoMensajes = require('../src/service/DAO/daoMongoMensajes.js');
    const daoMongoPedidos = require('../src/service/DAO/daoMongoPedidos.js');

    const DAOMongo = {
      productos: daoMongoProductos,
      mensajes: daoMongoMensajes,
      pedidos: daoMongoPedidos,
    };
    DAO = DAOMongo;
    break;

  case 'ARCHIVO':
    const daoFSProductos = require('../src/service/DAO/daoFSProductos.js');
    const daoFSMensajes = require('../src/service/DAO/daoFSMensajes.js');
    const daoFSPedidos = require('../src/service/DAO/daoFSPedidos.js');

    const DAOFS = {
      productos: daoFSProductos,
      mensajes: daoFSMensajes,
      pedidos: daoFSPedidos,
    };
    DAO = DAOFS;
    break;
}
module.exports = {
  SECRET: process.env.SECRET,
  HOST: process.env.HOST,
  MONGOURL: process.env.MONGOURL,
  PORT: process.env.PORT,
  DB: DAO,
};
