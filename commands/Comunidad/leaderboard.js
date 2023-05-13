const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const quickmongo = new Database(mongourl)
const Levels = require("discord-xp")
Levels.setURL(mongourl)

module.exports= {
	name: 'leaderboard',
	aliases: ["lb"],
	description: "Envia el leaderboard del servidor",
	usage: ".leaderboard",
	cooldown: 3,

	async execute(client, message, cmd, args, Discord) {

		if((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {

			const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10)

			if(rawLeaderboard.length < 1) return message.reply("Nadie esta en el leaderboard!")

			const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)

			const lb = leaderboard.map(e =>`\`${e.position}\` | ${e.username}#${e.discriminator} | **${e.level} Nivel** | **${e.xp.toLocaleString()}**`).join("\n")

			const lbEmbed = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle(`Leaderboard de ${message.guild.name}`)
			.setThumbnail(message.guild.iconURL({dynamic: true}))
			.setDescription(`${lb}`)
			.setTimestamp()
			.setFooter("Resultados del leaderboard!")

			message.reply({embeds: [lbEmbed]})
			
		} else message.reply("El sistema de niveles esta desactivado!")
        }
}