const { Client } = require("discord.js")
const mongoose = require("mongoose");
const Database = process.env['mongourl']

module.exports = {
	name: "ready",
	once: true,
	/**
	 *@param {Client} client
         */ 
	execute(client) {
		console.log("El cliente esta listo!")
		if(!Database) return;

	}
}