const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'bal',
	aliases: ['balance', 'val'],
	description: "Ve el balance de tu cuenta!",
	usage: ".register",
	cooldown: 4,
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {


		let usuario =  message.mentions.users.first() || message.author;
		
		let dinerototal = await db.get(`economy-${usuario.id}-${message.guild.id}.balance`)
		let dinerobanco = await db.get(`economy-${usuario.id}-${message.guild.id}.bank`)
                if(dinerototal === null) {
					const din1Embed = new MessageEmbed()
		                        .setTitle(`Balance de ${usuario.username}`)
		                        .setColor("GREEN")
		                        .setDescription(`:x: - No esta registrado en la economia de floppa Utilities`)
					message.reply({ embeds: [din1Embed] })

			            return;

		} 
		const dinEmbed = new MessageEmbed()
		.setTitle(`Balance de ${usuario.username}`)
		.setColor("GREEN")
		.setDescription(`**Dinero: ${dinerototal}**\n**Dinero en el banco: ${dinerobanco}**`)

		message.reply({ embeds: [dinEmbed] })
	}
}