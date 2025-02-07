const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoosePaginator = require("mongoose-paginate-v2");
const mongoosePaginatorAgregate = require("mongoose-aggregate-paginate-v2");

const Proveedores = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    razon_social: {
      type: String,
    },
    direccion: {
        type: String,
      },
  },
  { timestamps: true }
);

Proveedores.plugin(mongoosePaginator);
Proveedores.plugin(mongoosePaginatorAgregate);

let ProveedoresModel = mongoose.model("proveedores", Proveedores);

ProveedoresModel.aggregatePaginate.options = {
  customLabels: {
    totalDocs: "total",
    docs: "data",
    limit: "limit",
    page: "page",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pages",
  },
  collation: { locale: "es" },
};
module.exports = ProveedoresModel;
