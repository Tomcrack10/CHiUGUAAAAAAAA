module.exports = {
	name: 'uptime',
	aliases: ['up'],
	description: "EL tiempo que el bot lleva encendido",
	usage: ".uptime",

	execute (client, message, cmd, args, Discord) {

		let days = Math.floor(client.uptime / 86400000)
		let hours = Math.floor(client.uptime / 3600000) % 24
		let minutes = Math.floor(client.uptime / 60000) % 60
		let seconds = Math.floor(client.uptime / 1000) % 60

		let upEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`Hecho - Mi uptime es: \`${days}\` dias, \`${hours}\` Horas, \`${minutes}\` minutos,\`${seconds}\` segundos, `)
		message.reply({ embeds: [upEmbed] })

	}

}