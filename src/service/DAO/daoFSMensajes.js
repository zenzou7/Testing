const ContainerArchivo = require('../../containers/ContainerArchivo.js');

let instance = null;
class mensajesDaoFS extends ContainerArchivo {
  constructor() {
    super('./DB/mensajes.json');
  }
  static getInstance() {
    if (!instance) {
      instance = new mensajesDaoFS();
    }
    return instance;
  }
}

module.exports = mensajesDaoFS.getInstance();
