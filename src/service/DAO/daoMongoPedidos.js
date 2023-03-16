const ContainerMongo = require('../../containers/ContainerMongo.js');
const pedidos = require('../../../models/pedidos.js');

let instance = null;
class pedidosDaoMongo extends ContainerMongo {
  constructor() {
    super(pedidos);
  }
  static getInstance() {
    if (!instance) {
      instance = new pedidosDaoMongo();
    }
    return instance;
  }
}

module.exports = pedidosDaoMongo.getInstance();
