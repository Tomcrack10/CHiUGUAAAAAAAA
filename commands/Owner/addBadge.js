const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'abadge',
	aliases: ['addbadge'],
	description: "Nos muestra el ping actual de Floppa",
	usage: ".ping",
	cooldown: 2,
	UserPerms: [""],
	BotPerms:["MANAGE_MESSAGES"],
	owner: true,

	async execute (client, message, cmd, args, Discord) {

		const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
                 const badges = await db.fetch(`badges-owner`)
		if(!user) return message.reply("Debes decir el usuario!")
                const badgeta = args.slice(1).join(" ")
		const badgeName = await badges.find(data => data.name.toLowerCase() === badgeta.toLowerCase());
		if(!badgeName) return message.reply(`No existe el badge ${badgeta}`)
                const emojiBadge = badges.find(data => data.name.toLowerCase() === badgeta.toLowerCase());
		await db.push(`badges-${user.id}`, { name: emojiBadge.name, emoji: emojiBadge.emoji })
		await db.set(`emoji-${user.id}-${emojiBadge.name}`, emojiBadge.emoji)
		message.reply(`:white_check_mark: - Se ha añadido correctamente la insignia a ${user.username}!`)
		

	}
}