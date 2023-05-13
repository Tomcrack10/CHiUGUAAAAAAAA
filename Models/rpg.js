const {Schema, model} = require("mongoose")

const Rpg = new Schema({
  user: {
    type: String,
    unique: true
  },
  positionX: {
    type: Number,
    default: 15,
  },
  positionY: {
    type: Number,
    default: 10,
  },
  dinero: {
    type: Number,
    default: 0
  },
  items_barra: {
    type: Array,
    default: ["null","null","null","null","null"]
  },
  armaduras: {
    type: Object,
    default: {
      1:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      2:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      3:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      4:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      5:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      }
    }
  },
  herramientas: {
    type: Object,
    default: {
      1:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      2:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      3:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      4:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      5:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      6:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      7:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      8:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      9:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      },
      10:{
        nombre: "null",
        durabilidad: 0,
        atributos: []
      }
    }
  },
  items: {
    type: Object,
    default: {
      1:{
        nombre: "null",
        cantidad: 0
      },
      2:{
        nombre: "null",
        cantidad: 0
      },
      3:{
        nombre: "null",
        cantidad: 0
      },
      4:{
        nombre: "null",
        cantidad: 0
      },
      5:{
        nombre: "null",
        cantidad: 0
      },
      6:{
        nombre: "null",
        cantidad: 0
      },
      7:{
        nombre: "null",
        cantidad: 0
      },
      8:{
        nombre: "null",
        cantidad: 0
      },
      9:{
        nombre: "null",
        cantidad: 0
      },
      10:{
        nombre: "null",
        cantidad: 0
      },
      11:{
        nombre: "null",
        cantidad: 0
      },
      12:{
        nombre: "null",
        cantidad: 0
      },
      13:{
        nombre: "null",
        cantidad: 0
      },
      14:{
        nombre: "null",
        cantidad: 0
      },
      15:{
        nombre: "null",
        cantidad: 0
      },
      16:{
        nombre: "null",
        cantidad: 0
      },
      17:{
        nombre: "null",
        cantidad: 0
      },
      18:{
        nombre: "null",
        cantidad: 0
      },
      19:{
        nombre: "null",
        cantidad: 0
      },
      20:{
        nombre: "null",
        cantidad: 0
      }
    }
  }
})

module.exports = model("rpg",Rpg)