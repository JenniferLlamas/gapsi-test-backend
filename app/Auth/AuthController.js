const user_json = require("../../user.json");

/**
 * @class Auth
 * @description Clase que contiene todos los metodos referentes a proveedores
 */
class AuthController {
  


  /**
   * @static
   * @memberof AuthController
   *
   * @function get
   * @description Obtiene la informacion del usuario desde el json
   * */
  static logged = async ({ params }, response) => {
    return response.status(200).json({  user_json });

  };

  
}

module.exports = AuthController;
