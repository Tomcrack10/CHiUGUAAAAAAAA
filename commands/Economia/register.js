const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'register',
	aliases: ['registrarse', 'iniciar'],
	description: "Registrate en la economia de Floppa!",
	usage: ".register",
	cooldown: 10,
	BotPerms:["MANAGE_MESSAGES"],

  async execute (client, message, cmd, args, Discord) {


		const user = await db.get(`economy-${message.author.id}-${message.guild.id}`)
		if(user) return message.reply("Ya estas registrado en la Economia de floppa utilities!")

		
	        db.set(`economy-${message.author.id}-${message.guild.id}`, { balance: 0, bank: 0 })
		message.reply("Te acabas de registrar en la economia de Floppa Utilities!")
		

	}
}