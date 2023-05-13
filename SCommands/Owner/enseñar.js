const { CommandInteraction } = require("discord.js");
const token = process.env['cbtoken']
let chatbot = require("espchatbotapi")
chatbot = new chatbot(token,'default')
module.exports = {
	name: "enseñar",
	description: "enseñame algo",
	options: [
		{
			name: "input",
			description: "Coloca la palabra / oracion a enseñar",
			type: "STRING",
			required: true,
		},
		{
			name: "output",
			description: "Coloca lo que dire a la palabra",
			type: "STRING",
			required: true,
		},
	],

	/**
	*
	*@param {CommandInteraction} interaction
	*/
	execute(interaction) {

	const input = interaction.options.getString("input")
	const output = interaction.options.getString("output")

	if(interaction.user.id !== "590606524682993751") return interaction.reply("This command is classified!")

	chatbot.enseñar(input, output).then(r => {
        interaction.reply(r) //deberia decirte que se enseño correctamente
        }).catch(err => {
        console.log(err) //Si ocurre un error
        })
		
	}
}