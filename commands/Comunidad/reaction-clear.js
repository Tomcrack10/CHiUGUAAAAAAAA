
module.exports= {
	name: 'reaction-clear',
	description: "Elimina los emojis ya establecidos en el panel de reacciones",
	aliases: ["rclear"],
	usage: ".ticket <channel> <custom message>",
	BotPerms: ["MANAGE_CHANNELS"],
	UserPerms: ["ADMINISTRATOR"],

	async execute(client, message, cmd, args, Discord) {
    const Schema = require("../../Models/reaction-roles")
		Schema.findOne({ Guild: message.guild.id }, async (err,data) => {

		if(data) {
			await data.delete()
			message.reply(" Los emojis configurados para el panel de reacciones han sido eliminados!")
		} else {
			message.reply("No hay emojis configurados para el panel de reacciones")
		}
		})

	}
}