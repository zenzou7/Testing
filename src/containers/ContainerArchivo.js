const fs = require('fs');

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, 'utf-8');
      const res = await JSON.parse(objs);

      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id) {
    const objs = await fs.promises.readFile(this.ruta, 'utf-8');
    const res = await JSON.parse(objs);
    const buscado = res.find((o) => o.id == id);

    if (buscado) {
      return buscado;
    }

    return { error: 'No encontrado' };
  }

  async save(obj) {
    console.log('entre');
    try {
      const objs = await fs.promises.readFile(this.ruta, 'utf-8');
      const res = await JSON.parse(objs);
      let id;

      if (!res || !res.length) {
        id = 1;
      } else {
        res.forEach((o) => {
          id = o.id;
        });

        id = id + 1;
      }

      const guardar = res && res.length ? [...res, { ...obj, id }] : [{ ...obj, id }];

      await fs.writeFile(this.ruta, JSON.stringify(guardar), (err) => {
        if (err) {
          console.log(err);
        } else {
          return console.log(`producto ${obj.name} agregado con el id ${obj.id}`);
        }
      });
      return 'Guardado con exito!';
    } catch (error) {
      console.log({ error });
      return { error };
    }
  }

  async update(obj) {
    try {
      const objs = await this.getAll();
      const objInList = await this.getById(obj.id);

      if (objInList) {
        const filter = objs.filter((o) => o.id != obj.id);
        const newObjt = [...filter, obj];
        await fs.writeFile(this.ruta, JSON.stringify(newObjt), { encoding: 'utf-8' });
        return 'Guardado con exito!';
      } else {
        throw new Error('No encontramos un item con ese id');
      }
    } catch (error) {
      return { error };
    }
  }

  async delete(id) {
    try {
      const objs = await this.getAll();
      const obj = await this.getById(id);
      console.log(id);
      if (!objs || !objs.length || !obj) {
        return { error: 'No encontramos lo que desea borrar' };
      }

      const newObjs = objs.filter(obj => obj.id != id);
      console.log(newObjs);
      fs.writeFileSync(this.ruta,JSON.stringify(newObjs))
      return console.log(`Borrado con exito`);
    } catch (error) {
      return { error };
    }
  }
}

module.exports = ContenedorArchivo;
