const {Schema, model} = require("mongoose")

const Modal = new Schema({
  channel: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

module.exports = model("webhook",Modal)