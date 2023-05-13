const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'cbadge',
	aliases: ['createbadge'],
	description: "Nos muestra el ping actual de Floppa",
	usage: ".ping",
	cooldown: 2,
	UserPerms: [""],
	BotPerms:["MANAGE_MESSAGES"],
	owner: true,

	async execute (client, message, cmd, args, Discord) {

		const badgeName = args.slice(1).join(" ")
		const badgeEmoji = args[0]

		if(!badgeEmoji || !badgeName) return message.reply("Debes especificar el nombre y el emoji!")

		const badges = await db.get(`badges-owner`)
		
		await db.push(`badges-owner`, { name: badgeName, emoji: badgeEmoji })
		message.reply(":white_check_mark: - Se ha creado correctamente la insignia!")
		

	}
}