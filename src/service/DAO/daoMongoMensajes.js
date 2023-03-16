const ContainerMongo = require('../../containers/ContainerMongo.js');
const mensajes = require('../../../models/mensajes.js');

let instance = null;
class mensajesDaoMongo extends ContainerMongo {
  constructor() {
    super(mensajes);
  }
  static getInstance() {
    if (!instance) {
      instance = new mensajesDaoMongo();
    }
    return instance;
  }
}

module.exports = mensajesDaoMongo.getInstance();
