const mongoose = require("mongoose")
require("dotenv").config()

const mongourl = process.env['mongourl']

module.exports = () => {

	if(!mongourl) return

	mongoose.connect(mongourl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(console.log("Connected to MongoDB Database!"))
  .catch((error)=>{console.log(error)})
}