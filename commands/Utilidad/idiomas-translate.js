module.exports = {
	name: 'idiomas-traductor',
	aliases: ['idiomas-translate', 'i-traductor', 'idiomas'],
	description: "Simula que alguien se une",

	execute (client, message, cmd, args, Discord) {


		const idiomasEmbed = new Discord.MessageEmbed()
		.setTitle("Estos Son los idiomas disponibles en el traductor")
		.setDescription('**en, es, english, french, spanish, portuguese, japanese, chinese, ja, italian, russian, ru, it, fr**')

                   message.channel.send({ embeds: [idiomasEmbed] })
	       }
	}