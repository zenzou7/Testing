const { normalize, schema } = require('normalizr');
const express = require('express');
const app = express();
const config = require('../../config/config.js');
const DAO = config.DB;
const mensajesDaoMongo = require('./DAO/daoMongoMensajes.js');
const daoMongoProductos = require('./DAO/daoMongoProductos.js');

async function websocket(io) {
  io.on('connection', async (socket) => {
    console.log('Usuario conectado');

    socket.on('msg', async (data) => {
      let fecha = new Date();

      const msg = {
        author: {
          id: data.email,
          nombre: data.nombre,
          apellido: data.apellido,
          edad: data.edad,
          avatar: data.avatar,
        },
        text: {
          mensaje: data.mensaje,
          fecha: fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear(),
          hora: fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds(),
        },
      };

      DAO.mensajes.save(msg);
      const allData = await DAO.mensajes.getAll();

      const mensajeSchema = new schema.Entity('mensaje');
      const authorSchema = new schema.Entity(
        'author',
        {
          mensaje: mensajeSchema,
        },
        { idAttribute: 'email' }
      );
      const chatSchema = new schema.Entity('chat', {
        author: [authorSchema],
      });
      const normalizado = normalize({ id: 'chatHistory', messages: allData }, chatSchema);
      console.log(JSON.stringify(normalizado));

      io.sockets.emit('msg-list', { normalizado: normalizado });
    });

    socket.on('sendTable', async (data) => {
      DAO.productos.save(data);

      try {
        const productos = await DAO.productos.getAll();
        socket.emit('prods', productos);
      } catch (err) {
        logger.log('error', `${err} - log error`);
      }
    });
  });
}

module.exports = websocket;
