const ms = require("ms")
module.exports = {
	name: "kick",
	description: "Expulsa a un miembro",
	usage: ".kick",
	UserPerms: ["KICK_MEMBERS"],
	BotPerms: ["KICK_MEMBERS"],
	cooldown: 5,

	async execute (client, message, cmd, args, Discord) {

		if(!args[0]) return message.reply("Menciona un usuario primero!")

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

		if(!member) return message.reply("El usuario que diste no es valido! Intenta mencionarlo o dar su ID!")

		
		if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply("No puedes banear a un usuario con tu misma o mayor posicion de rol!")

		if(message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply("No puedes banear un miembro de mi misma posicion o mayor!")

		const row = new Discord.MessageActionRow().addComponents(

			new Discord.MessageButton()
			.setStyle('DANGER')
			.setCustomId("kickyes")
			.setLabel("Si"),

			new Discord.MessageButton()
		        .setStyle("PRIMARY")
		        .setCustomId("kickno")
		        .setLabel("No"),
		
		)

		let kickAskEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription("⚠️ - Estas seguro de que quieres kickear a este miembro?")

		let kickEndEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription("Gracias por utilizar Floppa Utilities para este comando!")

		let reason = args.slice(1).join(" ")
		if(!reason) reason = "No se ah dado una razon"

		let kickEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`${member} Ha sido correctamente baneado debiado a : ${reason}`)

		let kickEmbed2 = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`Se ah cancelado la solicitud de kick`)

		const kickPage = await message.reply({ embeds: [kickAskEmbed], components: [row] })

		const col = await kickPage.createMessageComponentCollector({
			componentType: "BUTTON",
			time: ms('10s'),
		})

		col.on('collect', i => {

			if(i.user.id !== message.author.id) return

			if(i.customId === 'kickyes') {

				member.kick({ reason })

				member.send(`Has sido kickeado de: **${message.guild.name}** por ${message.author} debido : ${reason}`).catch(err => console.log("No se pudo mandar un mensaje a un usuario con el md cerrado"))

				kickPage.edit({ embeds: [kickEmbed], components: [] })
			}
			
			else if(i.customId === 'kickno') {

				kickPage.edit({ embeds: [kickEmbed2], components: [] })
			}
		})

		col.on('end', () => {

			kickPage.edit({ embeds: [kickEndEmbed], components: [] })
		})
	}
}