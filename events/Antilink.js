const Discord = require("discord.js")
const client = require('../index')
const { Database } = require('quickmongo')
const mongoURL = process.env['mongourl']
const quickmongo = new Database(mongoURL)
require("dotenv").config()

client.on("messageCreate", async (message) => {

	if(message.author.bot || !message.guild) return

	if((await quickmongo.fetch(`antilink-${message.guild.id}`)) === true) {

		if(message.member.permissions.has("ADMINISTRATOR")) return

		if(message.content.startsWith("https://tenor.com/")) return
		
		if (message.content.toLowerCase().includes("https://") || message.content.toLowerCase().includes("http://") ||
		message.content.toLowerCase().includes("www.") || message.content.toLowerCase().includes(".com") ||
		message.content.toLowerCase().includes(".gg") || message.content.toLowerCase().includes(".xyz") ||
		message.content.toLowerCase().includes(".in") || message.content.toLowerCase().includes("discord.gg/") ||
		message.content.toLowerCase().includes("discord.com/invite/") || message.content.toLowerCase().includes(".ly") ||
		message.content.toLowerCase().includes("dsc.gg/")) {

			await message.delete().catch(err => {

				if(err.code !== 10008) return console.log(err)
			})
			const LinkEmbed = new Discord.MessageEmbed()
			.setTitle("Link Detectado!")
			.setDescription(`${message.author} Este servidor esta protegido por el sistema Anti-Links! No puedes enviar ningun link!`)
			.setColor("RED")
			message.channel.send({ embeds: [LinkEmbed] })
		}

		 
	}
})