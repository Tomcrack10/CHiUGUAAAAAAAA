const ms = require("ms")
module.exports = {
	name: "ban",
	description: "Banea un miembro",
	usage: ".ban",
	UserPerms: ["BAN_MEMBERS"],
	BotPerms: ["BAN_MEMBERS"],
	cooldown: 5,

	async execute (client, message, cmd, args, Discord) {

		if(!args[0]) return message.reply("Primero menciona un miembro!")

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

		if(!member) return message.reply("El usuario que diste no es valido! Intenta mencionarlo o dar su ID!")

		if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply("No puedes banear a un usuario con tu misma o mayor posicion de rol!")

		if(message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply("No puedes banear un miembro de mi misma posicion o mayor!")

		const row = new Discord.MessageActionRow().addComponents(

			new Discord.MessageButton()
			.setStyle('DANGER')
			.setCustomId("banyes")
			.setLabel("Si"),

			new Discord.MessageButton()
		        .setStyle("PRIMARY")
		        .setCustomId("banno")
		        .setLabel("No"),
		
		)

		let banAskEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription("⚠️ - Estas seguro de que quieres banear este miembro?")

		let banEndEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription("Gracias por utilizar Floppa Utilities para este comando!")

		let reason = args.slice(1).join(" ")
		if(!reason) reason = "No se ah dado razon"

		let banEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`${member} Ha sido correctamente baneado por : ${reason}`)

		let banEmbed2 = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`Se ah cancelado la solicitud de Ban!`)

		const banPage = await message.reply({ embeds: [banAskEmbed], components: [row] })

		const col = await banPage.createMessageComponentCollector({
			componentType: "BUTTON",
			time: ms('10s'),
		})

		col.on('collect', i => {

			if(i.user.id !== message.author.id) return

			if(i.customId === 'banyes') {

				member.ban({ reason })

				member.send(`Has sido baneado de: **${message.guild.name}** por ${message.author} debido a : ${reason}`).catch(err => console.log("No se pudo mandar un mensaje a un usuario con el md cerrado"))

				banPage.edit({ embeds: [banEmbed], components: [] })
			}
			
			else if(i.customId === 'banno') {

				banPage.edit({ embeds: [banEmbed2], components: [] })
			}
		})

		col.on('end', () => {

			banPage.edit({ embeds: [banEndEmbed], components: [] })
		})
	}
}