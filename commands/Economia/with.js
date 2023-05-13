const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'with',
	aliases: ['retirar', 'wth'],
	description: "Retira dinero de tu banco!",
	usage: ".ping",
	cooldown: 2,

	async execute (client, message, cmd, args, Discord) {

		const user = db.fetch(`economy-${message.author.id}-${message.guild.id}`)
		if(user  === null) return message.reply("No estas registrado en la Economia de floppa utilities! Utiliza f!register para registrarte!")

		const cantidad = args[0]

		const dinerototal =  await db.get(`economy-${message.author.id}-${message.guild.id}.bank`)

		if(cantidad > dinerototal) return message.reply("No tienes tanto dinero en el banco!")

		if(!cantidad) return message.reply("Debes decir una cantidad!")

		if(cantidad === 'all') {
			const dinerot = await db.fetch(`economy-${message.author.id}-${message.guild.id}.bank`)
			await db.add(`economy-${message.author.id}-${message.guild.id}.balance`, parseInt(dinerot))
			await db.subtract(`economy-${message.author.id}-${message.guild.id}.bank`, parseInt(dinerot))
			message.reply(`:white_check_mark: - **Has retirado correctamente ${dinerot}**`)
			return;
		}

		if(isNaN(cantidad)) return message.reply("Debe ser un numero!")

			await db.add(`economy-${message.author.id}-${message.guild.id}.balance`, parseInt(cantidad))
			await db.subtract(`economy-${message.author.id}-${message.guild.id}.bank`, parseInt(cantidad))
		
                     message.reply(`:white_check_mark: - **Has retirado correctamente ${cantidad}**`)

	}
}