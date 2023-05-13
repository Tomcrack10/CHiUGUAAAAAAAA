
module.exports= {
	name: 'ticket',
	description: "Crea el panel de ticket",
	aliases: ["ticket-setup"],
	usage: ".ticket <channel> <custom message>",
	BotPerms: ["MANAGE_CHANNELS"],
	UserPerms: ["ADMINISTRATOR"],

	async execute(client, message, cmd, args, Discord) {

		var customMSG = args.slice(1).join(" ")
                if(!customMSG) {
			var customMSG =  "__**Como hacer un ticket**__\n" + "> Da click en el boton 'Crear Ticket'\n" + "Cuando tu ticket este hecho expresa tu problema"
		}
		const channelID = message.mentions.channels.first()
		if(!channelID) return message.reply("Por favor menciona un canal para enviar el panel de ticket!")
		const tickEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
		.setDescription(`${customMSG}`)
		.setTitle("Ticket")
		.setTimestamp()

		const bt = new Discord.MessageActionRow().addComponents(

			new Discord.MessageButton()
			.setCustomId("tic")
			.setLabel("🎫 Crear Ticket!")
			.setStyle("PRIMARY")
		)


		channelID.send({ embeds: [tickEmbed], components: [bt] })

	}
}