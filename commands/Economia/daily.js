const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'daily',
	aliases: ['diario', 'dly'],
	description: "Obten dinero cada 24 horas!!",
	usage: ".register",
	cooldown: 24 * 60 * 60,
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {

		const user = await db.fetch(`economy-${message.author.id}-${message.guild.id}`)
		if(user  === null) return message.reply("No estas registrado en la Economia de floppa utilities! Utiliza f!register para registrarte!")
                
                 let random = Math.floor(Math.random() * (5000 - 500 + 1) + 50)

		
		const usuario = message.author
	        const econEmbed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("Diario")
		.setDescription(`**Obtuviste tu dinero diario, has ganado ${random}**`)
		db.add(`economy-${message.author.id}-${message.guild.id}.balance`, random)
		message.reply({ embeds: [econEmbed] })
		

	}
}