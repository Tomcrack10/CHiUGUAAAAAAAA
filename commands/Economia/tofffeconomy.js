/*const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'toffeconomy',
	aliases: ['offeconomy', 'offeco'],
	description: "Desabilita la economia de Floppa utilities para tu servidor, si ya esta desabilitada y la quieres habilitar de nuevo utiliza de nuevo este comando",
	usage: ".toffeconomy",
	cooldown: 2,
	UserPerms: ["ADMINISTRATOR"],
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {

		message.reply("a")
		const statoff = await db.get(`stateco-${message.guild.id}`)//, { on: 0 })
		const staton = await db.get(`stateco-${message.guild.id}`)//, { on: 1 })
		if(statoff) {
			db.set(`stateco-${message.guild.id}`, { on: 1 })
			message.reply("Se acaba de habilitar la economia de nuevo correctamente!")
		}
		if(staton) {
			db.set(`stateco-${message.guild.id}`, { on: 0 })
			message.reply("Se acaba de deshabilitar la economia de nuevo correctamente!")
			
		}

		if( statoff || staton ) {
			  db.set(`stateco-${message.guild.id}`, { on: 0 })
		          message.reply("Se acaba de deshabilitar la economia correctamente! Si quieres volverla a activar utiliza este comando nuevamente")
		}
	      
		

	}
}
*/