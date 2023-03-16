const config = require('../../config/config.js');
const DAO = config.DB;
const yargs = require('yargs/yargs')(process.argv.slice(2));
const args = yargs.default({ PORT: config.PORT }).argv;
const winston = require('winston');

const logger = winston.createLogger({
  level: 'warn',
  transports: [new winston.transports.Console({ level: 'info' }), new winston.transports.File({ filename: 'warn.log', level: 'warn' }), new winston.transports.File({ filename: 'error.log', level: 'error' })],
});

const apiJson = async (req, res) => {
  const data = await DAO.productos.getAll();
  res.json(data);
};

const getRoot = async (req, res) => {
  logger.log('info', 'Get / - log info');
  try {
    const prods = await DAO.productos.getAll();

    res.render('pages/form', { products: prods });
  } catch (err) {
    logger.log('error', `Error in Get /: ${err}- log error`);
  }
};

const postApiPedidos = (req, res) => {
  logger.log('info', 'Post en /api/pedidos - log info');
  try {
    const body = req.body;

    const { username, password, number, avatar, email } = req.user;

    const pedido = {
      username: username,
      email: email,
      number: number,
      avatar: avatar,
      pedido: body,
    };
    console.log(pedido);
    DAO.pedidos.save(pedido);
    res.json('Pedido hecho con exito!');
  } catch (err) {
    logger.log('error', `Error in Post /api/pedidos: ${err}- log error`);
  }
};

const getInfo = (req, res) => {
  logger.log('info', 'get en /info - log info');

  res.json({
    Argumentos: args,
    Path: process.execPath,
    OS: process.plataform,
    ProcessId: process.pid,
    NodeVersion: process.version,
    MemoriaTotalReservada: process.memoryUsage.rss(),
    CarpetaDelProyecto: process.cwd(),
  });
};

module.exports = {
  apiJson,
  getRoot,
  postApiPedidos,
  getInfo,
};
