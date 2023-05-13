const Discord = require("discord.js")
const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const ms = require("ms")
const perm = "MANAGE_GUILD"
module.exports = {
	name: "giveaway",
	description: "Inicia, Termina Reroll, Pausa, o Continua  a giveaway",
	options: [
		{
			name: "start",
			description: "Inicia un giveaway",
			type: "SUB_COMMAND",
			options: [
				{
					name: "duration",
					description: "Da la duracion(1m, 1h ,1d)",
					type: "STRING",
					required: true,
				},
				{
					name: "winner-count",
					description: "Da el numero de ganadores",
					type: "INTEGER",
					required: true,
				},
				{
					name: "prize",
					description: "Da el premio",
					type: "STRING",
					required: true,
				},
				{
					name: "channel",
					description: "Selecciona el canal para enviar el giveaway",
					type: "CHANNEL",
					channelTypes: ["GUILD_TEXT"],
					required: false,
				},
				{
					name: "role",
					description: "Selecciona un rol a mencioar",
					type: "ROLE",
					required: false,
				},
				
				
			]
		},
		
		{
			name: "actions",
			description: "Options for a giveaway",
			type: "SUB_COMMAND",
			options: [
				{
					name: "options",
					description: "Selecciona una opcion",
					type: "STRING",
					required: true,
					choices: [
						{
							name: "end",
							value: "end"
						},
						{
							name: "pause",
							value: "pause"
						},
						{
							name: "unpause",
							value: "unpause"
						},
						{
							name: "reroll",
							value: "reroll"
						},
						{
							name: "delete",
							value: "delete"
						},
					]
					
				},
				{
					name: "message-id",
					description: "Da la id del mensaje del giveaway",
					type: "STRING",
					required: true,
				}
			],
		},
                
		
	],

	/**
	*
        *@param {Client} client
	*@param {CommandInteraction} interaction
	*/

execute(interaction, client, options) {

          if(!interaction.member.permissions.has(perm)) return interaction.reply("NO TIENES PERMISO PARA EJECUTAR ESTE COMANDO")
	
	
	const Sub = interaction.options.getSubcommand()

	const errEmbed = new Discord.MessageEmbed()
		.setColor("RED")
	const sucEmbed = new Discord.MessageEmbed()
		.setColor("#3d35cc")

	switch (Sub) {

		case "start": {

			const gChannel = interaction.options.getChannel("channel") || interaction.channel
			const duration = interaction.options.getString("duration")
			const winnerCount = interaction.options.getInteger("winner-count")
			const prize = interaction.options.getString("prize")
			const role = interaction.options.getRole("role") || []

			const tmenderrEmbed = new Discord.MessageEmbed()
			.setColor("#3d35cc")
			.setDescription("!! - La duracion debe ser un numero terminado en 's'/'m'/'h'/'d'!")

			if (!duration.endsWith("s") && !duration.endsWith("m") && !duration.endsWith("h") && !duration.endsWith("d")) return interaction.followUp({ embeds: [tmenderrEmbed], ephemeral: true })

			client.giveawaysManager.start(gChannel, {

				duration: ms(duration),
				winnerCount,
				prize,
				embedColor: "#3d35cc",
				embedColorEnd: "3d35cc",

				messages: {
					        giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
                                              giveawayEnded: '🎉🎉 **GIVEAWAY Terminado** 🎉🎉',
                                            title: '{this.prize}',
                                  drawing: 'Termina en: {timestamp}',
                                  dropMessage: 'Se el primero en reaccionar al: 🎉 !',
                                  inviteToParticipate: 'Reacciona con el 🎉 para participar!',
                                  winMessage: 'Felicitaciones, {winners}!  Has(n) ganado **{this.prize}**!\n{this.messageURL}',
                                  embedFooter: '{this.winnerCount} ganador(es)',
                                  noWinner: 'Giveaway cancelado, No han habido participantes validos',
                                  hostedBy: 'Alojado por: {this.hostedBy}',
                                  winners: 'Ganador(es):',
                                   endedAt: 'Terminado el: '
				}
				
			}).then(async () => {

				sucEmbed.setDescription(`✅ - El giveaway a sido correctamente iniciando en ${gChannel}`)
				return interaction.reply({ embeds: [sucEmbed], ephemeral: true })
			}).catch(err => {

				errEmbed.setDescription(`!! - Un error a ocurrido!\n\n\`Error: ${err}\``)
				return interaction.reply({ embeds: [errEmbed], ephemeral: true})
			})
		}
		break;

		case "actions": {

			
			const choice = interaction.options.getString("options")
			const messageID = interaction.options.getString("message-id")

                          const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID)   


                          if (!giveaway) {

				  errEmbed.setDescription(`!! - Unable to find the giveaway with the message ID: **${messageID}** in this server!`)
				  return interaction.reply({ embeds: [errEmbed], ephemeral: true })
}
			switch (choice) {
					case "end": {
					client.giveawaysManager.end(messageID).then(() => {

						sucEmbed.setDescription(`✅ - El giveaway ah terminado`)
						return interaction.reply({ embeds: [sucEmbed], ephemeral: true })

 

					}).catch(err => {
						errEmbed.setDescription(`!! - An error has ocurred!\n\n\`Error: ${err}\``)
						return interaction.reply({ embeds: [errEmbed], ephemeral: true })
					})

 
}
			break;

			case "pause": {
					client.giveawaysManager.pause(messageID).then(() => {

						sucEmbed.setDescription(`✅ - The giveaway has been paused`)
						return interaction.reply({ embeds: [sucEmbed], ephemeral: true })
c
 

					}).catch(err => {
						errEmbed.setDescription(`!! - An error has ocurred!\n\n\`Error: ${err}\``)
						return interaction.reply({ embeds: [errEmbed], ephemeral: true })
					})

 
}

		
			break;
	               case "unpause": {
					client.giveawaysManager.unpause(messageID).then(() => {

						sucEmbed.setDescription(`✅ - The giveaway has been unpausef`)
						return interaction.reply({ embeds: [sucEmbed], ephemeral: true })

 

					}).catch(err => {
						errEmbed.setDescription(`!! - An error has ocurred!\n\n\`Error: ${err}\``)
						return interaction.reply({ embeds: [errEmbed], ephemeral: true })
					})

 
}

			
			break;

                       case "reroll": {
					client.giveawaysManager.reroll(messageID).then(() => {

						sucEmbed.setDescription(`✅ - The giveaway has been rerolled`)
						return interaction.reply({ embeds: [sucEmbed], ephemeral: true })
 

					}).catch(err => {
						errEmbed.setDescription(`!! - An error has ocurred!\n\n\`Error: ${err}\``)
						return interaction.reply({ embeds: [errEmbed], ephemeral: true })
					})

 
}

			
			break;

                       case "delete": {
					client.giveawaysManager.delete(messageID).then(() => {

						sucEmbed.setDescription(`✅ - The giveaway has been deleted`)
						return interaction.reply({ embeds: [sucEmbed], ephemeral: true })

 

					}).catch(err => {
						errEmbed.setDescription(`!! - An error has ocurred!\n\n\`Error: ${err}\``)
						return interaction.reply({ embeds: [errEmbed], ephemeral: true })
					})

 
}

			
			break;
			
			}
			
		}





 





						
	
break;
	}
	
	}
}