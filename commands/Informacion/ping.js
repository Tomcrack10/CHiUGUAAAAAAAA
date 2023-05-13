module.exports = {
	name: 'ping',
	aliases: ['latency'],
	description: "Nos muestra el ping actual de Floppa",
	usage: ".ping",
	cooldown: 2,
	UserPerms: [""],
	BotPerms:["MANAGE_MESSAGES"],

	execute (client, message, cmd, args, Discord) {

		message.reply("Calculando el ping actual...").then((msg) => {
			const ping = msg.createdTimestamp - message.createdTimestamp

			const pingEmbed = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle("PONG!")
			.addFields([
				{ name: "Latencia del bot:", value: `${ping}`},
				{ name: "Latencia del API:", value: `${client.ws.ping}`}
			])
			.setTimestamp()

			msg.edit({content: "Hecho! Este es mi ping actual:", embeds: [pingEmbed]})
		})
	}
}