const ContainerArchivo = require('../../containers/ContainerArchivo.js');

let instance = null;
class pedidosDaoFS extends ContainerArchivo {
  constructor() {
    super('./DB/pedidos.json');
  }
  static getInstance() {
    if (!instance) {
      instance = new pedidosDaoFS();
    }
    return instance;
  }
}

module.exports = pedidosDaoFS.getInstance();
