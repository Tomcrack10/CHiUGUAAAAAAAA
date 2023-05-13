const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'work',
	aliases: ['trabajar', 'wrk'],
	description: "Trabaja para ganar dinero en la economia de Floppa!",
	usage: ".register",
	cooldown: 3,
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {

		const user = await db.fetch(`economy-${message.author.id}-${message.guild.id}`)
		if(user  === null) return message.reply("No estas registrado en la Economia de floppa utilities! Utiliza f!register para registrarte!")
                
		let trabajo = ["policia", "profesor", "veterinario", "dentista", "doctor", "programador", "chef", "diseñador"]
                 let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]
                 let random = Math.floor(Math.random() * (700 - 50 + 1) + 50)

		
		const usuario = message.author
	        const econEmbed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("Trabajo")
		.setDescription(`**El usuario ${usuario} acaba de trabajar de ${randomtrabajo} y obtuvo ${random}$**`)
		db.add(`economy-${message.author.id}-${message.guild.id}.balance`, random)
		message.reply({ embeds: [econEmbed] })
		

	}
}