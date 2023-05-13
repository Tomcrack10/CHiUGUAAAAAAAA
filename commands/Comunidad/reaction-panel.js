const schema = require("../../Models/reaction-roles")

module.exports= {
	name: 'reaction-panel',
	description: "Crea el panel de reacciones con los roles que ya has configurado",
	aliases: ["rrpanel"],
	usage: ".ticket <channel> <custom message>",
	BotPerms: ["MANAGE_CHANNELS"],
	UserPerms: ["ADMINISTRATOR"],

	async execute(client, message, cmd, args, Discord) {

		const channel = message.mentions.channels.first() || message.channel


		schema.findOne({ Guild: message.guild.id }, async (err,data) => {

			if(!data) return message.reply("No has configurado ningun rol para el panel de reacciones!")

			const mapped = Object.keys(data.Roles).map((value, index) => {

				const role  = message.guild.roles.cache.get(data.Roles[value][0])

				return `\`${index + 1}.\` ${data.Roles[value][1].raw} - Reacciona para obtener el rol: ${role}`
			}).join("\n\n")

			const rrEmbed = new Discord.MessageEmbed()
			.setColor("RED")
		        .setTitle("ROLES DE REACCION")
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setDescription("Reacciona con los emojis de abajo para asignarte a ti mismo un rol!")
			.addField("\u200B", mapped)
			.setTimestamp()

			channel.send({ embeds: [rrEmbed] }).then((msg) => {

				data.Message = msg.id
				data.save()

				const reactions = Object.values(data.Roles).map((val) => val[1].id)

				   reactions.map(
                                   (emoji) => msg.react(emoji)
                                  .catch(error => {

                                      message.reply("Debes usar emojis de este servidor para que funcione!")
                                        console.error(error)

                        })
                )
			})	      
		})



	}
}