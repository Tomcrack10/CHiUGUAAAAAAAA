const { Util } = require("discord.js")
const Schema = require("../../Models/reaction-roles")

module.exports= {
	name: 'reaction-add',
	description: "Añade una nueva reaccion al panel de reacciones",
	aliases: ["radd"],
	usage: ".reaction-add <rol> <emoji>",
	BotPerms: ["ADD_REACTIONS"],
	UserPerms: ["ADMINISTRATOR"],

	async execute(client, message, cmd, args, Discord) {

		if(!args[0]) return message.reply("Por favor menciona un rol primero!")

		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

		if(!role) return message.reply("El rol que diste no es valido!")

		let [, emoji] = args

		if(!emoji) return message.reply("Por favor menciona un emoji primero!")

		const parsedEmoji = Util.parseEmoji(emoji)

		Schema.findOne({ Guild: message.guild.id }, async (err, data) => {


			if (data) {

				data.Roles[parsedEmoji.name] = [
					role.id,
					{
						id: parsedEmoji.id,
						raw: emoji
					}
				]

				await Schema.findOneAndUpdate({ Guild: message.guild.id }, data)
			} else {

				new  Schema({

					Guild: message.guild.id,
					Message: 0,
					Roles: {

						[parsedEmoji.name]: [
							role.id,
							{
								id: parsedEmoji.id,
								raw: emoji
							}
						]
					}
				}).save()
			}

			message.reply("El nuevo rol a sido añadido al panel de reaccion")
		})

	}
}