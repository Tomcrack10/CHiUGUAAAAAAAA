const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const quickmongo = new Database(mongourl)
const Levels = require("discord-xp")
Levels.setURL(mongourl)
const canvacord = require("canvacord")

module.exports= {
	name: 'rank',
	description: "Envia la carta de rango del usuario",
	usage: ".rank",
	cooldown: 3,

	async execute(client, message, cmd, args, Discord) {

		if((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {

			const target = message.author

			const user = await Levels.fetch(target.id, message.guild.id, true)

			if(!user) return message.reply("Parece que el usuario no ah ganado XP!")

			const neededXp = Levels.xpFor(parseInt(user.level) + 1)

			const rank =  new  canvacord.Rank()
			.setAvatar(target.displayAvatarURL({ Dynamic : false, format: 'png' }))
			.setCurrentXP(user.xp)
			.setLevel(user.level)
			.setBackground("IMAGE", 'https://i.pinimg.com/originals/fa/c0/5c/fac05c110c458e9bab3a3248bfb3c376.jpg')
			.setRequiredXP(neededXp)
			.setStatus(message.member.presence.status)
			.setProgressBar("BLUE", "COLOR")
			.setUsername(target.username)
			.setOverlay("RED", 0.7, true)
			.setDiscriminator(target.discriminator)

			rank.build().then(data => {

				const attachment = new Discord.MessageAttachment(data, 'rankcard.png')
				message.reply({ files: [attachment]})
			})
			
		} else message.reply("El sistema de niveles esta desactivado!")
	}
}