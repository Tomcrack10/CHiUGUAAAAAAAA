const { CommandInteraction } = require("discord.js");
const perm = "ADMINISTRATOR"

module.exports = {
	name: "ping",
	description: "Ping",
	permission: "ADMINISTRATOR",

	/**
	*
	*@param {CommandInteraction} interaction
	*/
	execute(interaction) {		
		
		
		interaction.reply({content: "POING"})
		
	}
}