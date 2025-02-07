const Proveedores = require("../../models/proveedores");

async function seeder() {
  for (let index = 1; index < 15; index++) {
    await Proveedores.create({
      nombre: "Proveedor "+index,
      razon_social: Math.floor(99) + index,
      direccion: "Calle de la Esperanza, Avenida de la Paz CP.000 " + index,
    });
  }
}

module.exports = {
  title: "Crear Proveedores",
  description: "Agrega proveedores iniciales a la base de datos",
  seeder,
};
