const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'dep',
	aliases: ['depositar', 'deposite'],
	description: "Deposita dinero en tu cuenta de banco!",
	usage: ".ping",
	cooldown: 2,

	async execute (client, message, cmd, args, Discord) {

		const user = await db.fetch(`economy-${message.author.id}-${message.guild.id}`)
		if(user  === null) return message.reply("No estas registrado en la Economia de floppa utilities! Utiliza f!register para registrarte!")

		const cantidad = args[0]

		const dinerototal =  await db.get(`economy-${message.author.id}-${message.guild.id}.balance`)

		if(cantidad > dinerototal) return message.reply("No tienes tanto dinero!")

		if(!cantidad) return message.reply("Debes decir una cantidad!")

		if(cantidad === 'all') {
			const dinerot = await db.fetch(`economy-${message.author.id}-${message.guild.id}.balance`)
			await db.add(`economy-${message.author.id}-${message.guild.id}.balance`, -dinerot)
			await db.add(`economy-${message.author.id}-${message.guild.id}.bank`, dinerot)
			message.reply(`:white_check_mark: - **Has guardado correctamente ${dinerot}**`)
			return;
		}

		if(isNaN(cantidad)) return message.reply("Debe ser un numero!")

			await db.add(`economy-${message.author.id}-${message.guild.id}.balance`, -cantidad)
			await db.add(`economy-${message.author.id}-${message.guild.id}.bank`, cantidad)
		
                     message.reply(`:white_check_mark: - **Has guardado correctamente ${cantidad}**`)

	}
}