const Proveedores = require("../../models/proveedores");

/**
 * @class ProveedoresController
 * @description Clase que contiene todos los metodos referentes a proveedores
 */
class ProveedoresController {
  /**
   * @static
   * @memberof ProveedoresController
   *
   * @function add
   * @description Registra una nuevo proveedor
   * */
  static add = async ({ body }, response) => {
    if (body.nombre) {
      let proveedor_registrado = await Proveedores.findOne({
        nombre: body.nombre,
      });
      if (proveedor_registrado)
        return response
          .status(400)
          .json({ message: "Ya hay un proveedor registrado con ese nombre" });
    }
    Proveedores.create(body)
      .then(async (proveedor) => {
        return response.status(200).json(proveedor);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  };

  /**
   * @static
   * @memberof ProveedoresController
   *
   * @function update
   * @description Actualiza un proveedor con la informacion enviada
   * */
  static update = async ({ body }, response) => {
    console.log("body", body);
    Proveedores.findOne({ _id: body.id })
      .then((proveedor) => {
        if (body.nombre != undefined) proveedor.nombre = body.nombre;
        if (body.razon_social != undefined)
          proveedor.razon_social = body.razon_social;
        if (body.direccion != undefined) proveedor.direccion = body.direccion;

        proveedor
          .save()
          .then((proveedor) => {
            return response.status(200).json(proveedor);
          })
          .catch((error) => {
            console.log(error);
            return response.status(400).json(error);
          });
      })
      .catch((err) => {
        console.log(err);

        return response.status(400).json(err);
      });
  };

  /**
   * @static
   * @memberof ProveedoresController
   *
   * @function delete
   * @description Elimina un proveedor.
   * */
  static delete = async ({ query, params }, response) => {

    let id = query.id || params.id;
    Proveedores.findOneAndDelete({ _id: id })
      .then(() => {
        return response.status(200).json({
          message: "Proveedor eliminado correctamente",
        });
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  };
  /**
   * @static
   * @memberof ProveedoresController
   *
   * @function get
   * @description Obtiene la informacion de un proveedor con base a su id
   * */
  static get = async ({ query, params }, response) => {
    let id = query.id || params.id;

    let proveedor = await Proveedores.findOne({ _id: id });
    if (proveedor == null)
      return response.status(404).json({
        message: "No existe el proveedor.",
      });

    return response.status(200).json(proveedor);
  };

  /**
   * @static
   * @memberof ProveedoresController
   *
   * @function list
   * @description Obtiene todos los proveedor registrados en la bd paginados.
   * */
  static list = async ({ query }, response) => {
    console.log(query, "query");
    let pipeline = [];

    if (query.search) {
      let buscar = query.search == undefined ? ".*" : query.search + ".*";
      pipeline.push({
        $match: {
          $and: [
            {
              $or: [{ nombre: new RegExp(buscar, "i") }],
              $or: [{ razon_social: new RegExp(buscar, "i") }],
            },
          ],
        },
      });
    }
    if (query.sort) {
      pipeline.push({
        $sort: {
          createdAt: query.sort,
        },
      });
    } else {
      pipeline.push({
        $sort: {
          createdAt: -1,
        },
      });
    }

    return response.status(200).json(
      await Proveedores.aggregatePaginate(Proveedores.aggregate(pipeline), {
        page: query.page == undefined ? 1 : query.page,
        limit: query.limit == undefined ? 10 : query.limit,
      })
    );
  };
}

module.exports = ProveedoresController;
