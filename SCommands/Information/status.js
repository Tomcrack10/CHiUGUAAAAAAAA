const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../SEvents/Client/ready");
const perm = "ADMINISTRATOR"


module.exports = {
	name: "status",
	description: "Muestra el estado del cliente y la coneccion a la base de datos",
	permission: "ADMINISTRATOR",
	/**
	*
	*@param {CommandInteraction} interaction
        *@param {Client} client
        */
	async execute(interaction, client) {
		const Response = new MessageEmbed()
		.setColor("AQUA")
		.setDescription(`**CLIENTE**: \`🟢ONLINE\` - \`${client.ws.ping}ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n**DATABASE**: \`${switchTo(connection.readyState)}\` ` )

		interaction.reply({embeds: [Response]})
	}
}

function switchTo(val) {
	var status = "";
	switch(val) {
		case 0 : status = `🔴 DESCONECTADO`
		break;
		case 1 : status = `🟢 CONECTADO`
		break;
		case 2 : status = `🟠 CONECTANDO`
		break;
		case 3 : status =  `🟣 DESCONECTANDO`
		break;
	}
	return status;
}