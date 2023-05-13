const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'aregister',
	description: "Registra a alguien mas en la economia de Floppa!",
	usage: ".register",
	cooldown: 0,
	owner: true,
 async execute (client, message, cmd, args, Discord) {

	const mencionado = message.mentions.users.first()

		const user = await db.get(`economy-${mencionado.id}-${message.guild.id}`)
		if(user) return message.reply("Ya esta registrado en la Economia de floppa utilities!")

		
	        db.set(`economy-${mencionado.id}-${message.guild.id}`, { balance: 0, bank: 0 })
		message.reply(`Acabas de registrar a ${mencionado.username} en la economia de Floppa Utilities!`)
		

	}
}