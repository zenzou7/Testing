const ContainerMongo = require('../../containers/ContainerMongo.js');
const productos = require('../../../models/productos.js');

let instance = null;
class productosDaoMongo extends ContainerMongo {
  constructor() {
    super(productos);
  }
  static getInstance() {
    if (!instance) {
      instance = new productosDaoMongo();
    }
    return instance;
  }
}

module.exports = productosDaoMongo.getInstance();
