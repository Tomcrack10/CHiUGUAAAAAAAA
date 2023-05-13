require("dotenv").config()
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const quickmongo = new Database(mongourl)

module.exports = {
	name: 'setup',
	aliases: ['set'],
	description: "Configura las diferentes funciones de floppa!",
	usage: ".setup <categoria>",
	cooldown: 5,
	UserPerms: ["ADMINISTRATOR"],
	
	async execute (client, message, cmd, args, Discord) {


		//if guild has no choice

		let choice = args[0]

		const toggleEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription("!! - Por favor da una opcion valida entre 'enable' o 'disable'! (enable = habilitar) (disable = desabilitar)")

		let noChoiceEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setTitle("No ah habido seleccion")
		.setThumbnail(message.guild.iconURL({ dynamic : true }))
		.setDescription("Escribe cualquier descripcion")
		.addField(`\u200B`, "__General__")
		.addField("Canal de Bienvenidas", "Seccion: welcome", true)
		.addField("Canal de Despedidas", "Seccion: Leave", true)
		.addField("Fondo de Bienvenida", "Seccion: `welbg`", true)
		.addField("Mensaje de Bienvenida", "Seccion: `welmsg`", true)
		.addField("Prefix", "Seccion: `prefix`", true)
		.addField('\u200B', "__Moderacion__")
		.addField("Canal de logs (registros)", "Seccion: `logs`", true)
		.addField("Canal de Sugerencias", "Seccion: `sugchannel`", true)
		.addField("\u200B", "Funcionalidades")
		.addField("AI ChatBot", "Seccion: `chatbot`", true)
		.addField("Sistema Anti-Links", "Seccion: `antilink`", true)
		.addField("Niveles", "Seccion: `levels`", true)
		.addField("Canal de Subida de nivel", "Seccion: `levelsup`", true)
		

	if (!choice) return message.reply({ embeds: [noChoiceEmbed] })

		//Getting welcome channel Status

		const getWelcomeChannel = await quickmongo.get(`welcome-${message.guild.id}`)
		const welcomeChannelCheck = await quickmongo.fetch(`welcome-${message.guild.id}`)

		let welcomeChannelStatus
		if (welcomeChannelCheck) {
			welcomeChannelStatus = `<#${getWelcomeChannel}>`
		} else welcomeChannelStatus = "**No canal establecido**"

		//Getting the Welcome Message Status
		const welcomeMessageCheck = await quickmongo.fetch(`welmsg-${message.guild.id}`)

		let welcomeMessageStatus
		if (welcomeMessageCheck) {
			welcomeMessageStatus = `Mensaje Personalizado`
		} else welcomeMessageStatus = `Mensaje por defecto`  

		//Getting Welcome Background Status
		const getWelcomeImage = await quickmongo.get(`welimg-${message.guild.id}`)
		const welcomeImageCheck = await quickmongo.fetch(`welimg-${message.guild.id}`)

		let welcomeImageStatus
		
		if (welcomeImageCheck) {
			welcomeImageStatus = `[Imagen Personalizada](${getWelcomeImage})`
		} else welcomeImageStatus = '[Imagen Por Defecto](https://cdn.discordapp.com/attachments/1021935164038840380/1022651081878151218/unknown.png)'

		//Getting leave channel Status

		const getLeaveChannel = await quickmongo.get(`leave-${message.guild.id}`)
		const leaveChannelCheck = await quickmongo.fetch(`leave-${message.guild.id}`)

		let leaveChannelStatus
		if (leaveChannelCheck) {
			leaveChannelStatus = `<#${getLeaveChannel}>`
		} else leaveChannelStatus = "**No canal establecido**"

		//Getting ChatBot channel Status

		const getChatbotChannel = await quickmongo.get(`chatbot-${message.guild.id}`)
		const chatbotChannelCheck = await quickmongo.fetch(`chatbot-${message.guild.id}`)

		let chatbotChannelStatus
		if (chatbotChannelCheck) {
			chatbotChannelStatus = `<#${getChatbotChannel}>`
		} else chatbotChannelStatus = "**No canal establecido**"

		//Getting The prefix Status
		const getPrefix = await quickmongo.get(`prefix-${message.guild.id}`)
		const prefixcheck = await quickmongo.fetch(`prefix-${message.guild.id}`)

		let prefixStatus;

		if(prefixcheck) {
			prefixStatus = `${getPrefix}`
		} else prefixStatus = "`Prefix por defecto: f!`"

		//Getting The levels status

		const levelsCheck = await quickmongo.fetch(`levels-${message.guild.id}`)

		let levelsStatus

		if(levelsCheck) {
			levelsStatus = "🟢 (ENCENDIDO)"
		} else levelsStatus = "🔴 (APAGADO)"

		//Getting Levels channel Status

		const getLevelsUpChannel = await quickmongo.get(`levelsup-${message.guild.id}`)
		const levelsUpCheck = await quickmongo.fetch(`levelsup-${message.guild.id}`)

		let levelsUpStatus
		if (levelsUpCheck) {
			levelsUpStatus = `<#${getLevelsUpChannel}>`
		} else levelsUpStatus = "**No canal establecido**"

		//Getting logs channel Status

		const getLogsChannel = await quickmongo.get(`logs-${message.guild.id}`)
		const logsChannelCheck = await quickmongo.fetch(`logs-${message.guild.id}`)

		let logsChannelStatus
		if (logsChannelCheck) {
			logsChannelStatus = `<#${getLogsChannel}>`
		} else logsChannelStatus = "**No canal establecido**"

		//Obteniendo el estado de las sugerencias
		const getSugChannel = await quickmongo.get(`sug-${message.guild.id}`)
		const SugChannelCheck = await quickmongo.fetch(`sug-${message.guild.id}`)

		let SugChannelStatus
		if (SugChannelCheck) {
			SugChannelStatus = `<#${getSugChannel}>`
		} else SugChannelStatus = "**No canal establecido**"

		//Getting Anti-Link Status
		const antiLinkCheck = await quickmongo.fetch(`antilink-${message.guild.id}`)

		let antiLinkStatus

		if(antiLinkCheck) {
			antiLinkStatus = "🟢 (ENCENDIDO)"
		} else antiLinkStatus = "🔴 (APAGADO)"


		if(choice === 'sugchannel') {
		
		const toggling = ["disable", "enable"]

		if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

		const sugChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

		if(args[1] === "enable") {

			if(!sugChannel) return message.reply("Menciona un canal para establecerlo como el canal de Sugerencias")

			await quickmongo.set(`sug-${message.guild.id}`, sugChannel.id)

			message.reply(`${sugChannel} Es ahora el canal de Sugerencias!`)
		}

		if(args[1] === "disable") {

			if(!quickmongo.has(`sug-${message.guild.id}`)) return message.reply("El canal de sugerencias ya esta desabilitado!")

			await quickmongo.delete(`sug-${message.guild.id}`)
			message.reply("El canal de sugerencias esta ahora apagado!")
		}
	}
		if(choice === 'logs') {
		
		const toggling = ["disable", "enable"]

		if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

		const logsChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

		if(args[1] === "enable") {

			if(!logsChannel) return message.reply("Menciona un canal para establecerlo como el canal de Logs")

			await quickmongo.set(`logs-${message.guild.id}`, logsChannel.id)

			message.reply(`${logsChannel} Es ahora el canal de logs!`)
		}

		if(args[1] === "disable") {

			if(!quickmongo.has(`logs-${message.guild.id}`)) return message.reply("El canal de logs ya esta desabilitado!")

			await quickmongo.delete(`logs-${message.guild.id}`)
			message.reply("El canal de logs esta ahora apagado!")
		}
	}


		//Setting Up Levels
		if (choice === "levels") {

			const toggling = ["disable", "enable"]
			if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

			if(args[1] === "enable") {

				if((await quickmongo.fetch(`levels-${message.guild.id}`)) === null) {

					await quickmongo.set(`levels-${message.guild.id}`, true) 
					return message.reply("El sistema de niveles esta ahora habilitado!")
				} else if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === false) {

					await quickmongo.set(`levels-${message.guild.id}`, true)
					return message.reply("El sistema de niveles esta ahora habilitado!")
				} else return message.reply("El sistema de niveles ya estaba desabilitado!")
			}

			if(args[1] === "disable") {

				if((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {

					await quickmongo.delete(`levels-${message.guild.id}`)
					return message.reply("El sistema de niveles ahora esta desabilitado!")
					
				} else return message.reply("El sistema de niveles ya estaba desabilitado!")
			}
		}

		//Setting Up Levels Channel

		if (choice === "levelsup") {

			if (!levelsCheck) return message.reply("Activa el sistema de niveles primero!")

			const levelsUpChannel = message.mentions.channels.first()

			if(!levelsUpChannel) return message.reply("Primero da un canal para la subida de niveles!")

			await quickmongo.set (`levelsup-${message.guild.id}`, levelsUpChannel.id)

			message.reply(`${levelsUpChannel} es ahora el canal de subida de nivel!`)
		}

		//Setting up Prefix

		if (choice === 'prefix') {

			const newPrefix = args[1]

			if(!newPrefix) return message.reply("Por favor proporciona un nuevo prefix!")

			if(newPrefix.length > 3) return message.reply("El prefix no puede tener mas de 3 caracteres!")

			await quickmongo.set(`prefix-${message.guild.id}`, newPrefix)
			
			message.reply(`El nuevo prefix es ahora ${newPrefix}`)
		}

		//Seting up the welcome Channel
	if(choice === 'welcome') {
		
		const toggling = ["disable", "enable"]

		if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

		const welcomeChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

		if(args[1] === "enable") {

			if(!welcomeChannel) return message.reply("Por favor menciona un canal para establecerlo para las bienvenidas!")

			await quickmongo.set(`welcome-${message.guild.id}`, welcomeChannel.id)

			message.reply(`${welcomeChannel} Ahora es el canal de Bienvenidas`)
		}

		if(args[1] === "disable") {

			if(!quickmongo.has(`welcome-${message.guild.id}`)) return message.reply("El canal de Bienvenidas ya estaba desactivado")

			await quickmongo.delete(`welcome-${message.guild.id}`)
			message.reply("El canal de bienvenidas ahora esta desabilitado")
		}
	}

	if(choice === 'welmsg') {

		const toggling = ["disable", "enable"]
		if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

		
		const welcomeMessage = args.slice(2).join(" ")

		const errmsgEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription('!! - Danos tu mensaje personalizado!')

		const welmsgerrEmbed =  new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription('!! - El mensaje debe incluir un **{}** para mencionar al usuario!\n\nEjemplo: **Hola {} Bienvenido a nuestro servidor! Diviertete!**.')
	
		const welmsgyEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription(`✅ - El mensaje personalizado ya esta!`)

		const welmsgnEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription(`✅ - El mensaje personalizado a sido removido y se a puesto el por defecto!`)
	         const welmsganEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription(`!! - No se ha establecido ningun mensaje personalizado hasta ahora`)

		if (args[1] === 'enable') {

			if(!welcomeMessage) return message.reply({ embeds: [errmsgEmbed] })

			if(!welcomeMessage.includes("{}")) return message.reply({ embeds: [welmsgerrEmbed] })



			await quickmongo.set(`welmsg-${message.guild.id}`, welcomeMessage)
			message.reply({ embeds: [welmsgyEmbed] })
		}

		if (args[1] === 'disable') {

			if(!quickmongo.has(`welmsg-${message.guild.id}`)) return message.reply({ embeds: [welmsganEmbed] })

			await quickmongo.delete(`welmsg-${message.guild.id}`)
			message.reply({ embeds: [welmsgnEmbed] })
		}
	}
			if(choice === 'welbg') {

		const toggling = ["disable", "enable"]
		if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

		const welcomeImage = args[2]

		const welimgerrEmbed =  new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription('!! - Por favor da el link de una imagen para establecerla como la imagen de las bienvenidas')

		const linkErrEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription('!! - La imagen que diste es invalida! Tiene que estar subida en Discord y en el formato `PNG` o `JPG`. Sube la imagen en Discord y copia y pega el link!')

		const welimgyEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription(`✅ - [Imagen](${welcomeImage}) Ahora es la imagen de bienvenida`)

		const welimgnEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription(`✅ - La imagen de bienvenida ahora es [Por Defecto](https://cdn.discordapp.com/attachments/1021935164038840380/1022651081878151218/unknown.png)`)
	         const welimganEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription(`!! - La imagen de bienvenidas ya es [Por Defecto](https://cdn.discordapp.com/attachments/1021935164038840380/1022651081878151218/unknown.png)`)

		if (args[1] === 'enable') {

			if(!welcomeImage) return message.reply({ embeds: [welimgerrEmbed] })

			if(!welcomeImage.startsWith("https://cdn.discordapp.com/attachments/") && !welcomeImage.endsWith(".jpg") && !welcomeImage.endsWith(".png")) return message.reply({ embeds: [linkErrEmbed]})

			await quickmongo.set(`welimg-${message.guild.id}`, welcomeImage)
			message.reply({ embeds: [welimgyEmbed] })
		}

		if (args[1] === 'disable') {

			if(!quickmongo.has(`welimg-${message.guild.id}`)) return message.reply({ embeds: [welimganEmbed] })

			await quickmongo.delete(`welimg-${message.guild.id}`)
			message.reply({ embeds: [welimgnEmbed] })
		}
	}
		//Setting up the leave channnel
	if(choice === 'leave') {
		
		const toggling = ["disable", "enable"]

		if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

		const leaveChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

		if(args[1] === "enable") {

			if(!leaveChannel) return message.reply("Por favor menciona un canal para establecerlo como canal de despedidas")

			await quickmongo.set(`leave-${message.guild.id}`, leaveChannel.id)

			message.reply(`${leaveChannel} Es ahora el canal de despedidas`)
		}

		if(args[1] === "disable") {

			if(!quickmongo.has(`leave-${message.guild.id}`)) return message.reply("Las despedidas ya estaban desactivadas!")

			await quickmongo.delete(`leave-${message.guild.id}`)
			message.reply("El canal de despedidas se desactivo")
		}
	}

	//Seting up the chatbot Channel
	if(choice === 'chatbot') {
		
		const toggling = ["disable", "enable"]

		if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

		const chatbotChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

		if(args[1] === "enable") {

			if(!chatbotChannel) return message.reply("Por favor menciona un canal para establecerlo para el CHATBOT")

			await quickmongo.set(`chatbot-${message.guild.id}`, chatbotChannel.id)

			message.reply(`${chatbotChannel} Es ahora el canal de Chatbot`)
		}

		if(args[1] === "disable") {

			if(!quickmongo.has(`chatbot-${message.guild.id}`)) return message.reply("El canal de chatbot ya esta desactivado!")

			await quickmongo.delete(`chatbot-${message.guild.id}`)
			message.reply("El canal de Chatbot se desactivo")
		}
	}

			//Setting Up Anti-Link
		if (choice === "antilink") {

			const toggling = ["disable", "enable"]
			if(!toggling.includes(args[1])) return message.reply({ embeds: [toggleEmbed] })

			if(args[1] === "enable") {

				if((await quickmongo.fetch(`antilink-${message.guild.id}`)) === null) {

					await quickmongo.set(`antilink-${message.guild.id}`, true) 
					return message.reply("El sistema de Anti-Links esta ahora habilitado!")
				} else if ((await quickmongo.fetch(`antilink-${message.guild.id}`)) === false) {

					await quickmongo.set(`antilink-${message.guild.id}`, true)
					return message.reply("El sistema de Anti-Links esta ahora habilitado!")
				} else return message.reply("El sistema de Anti-Links ya estaba habilitado!")
			}

			if(args[1] === "disable") {

				if((await quickmongo.fetch(`antilink-${message.guild.id}`)) === true) {

					await quickmongo.delete(`levels-${message.guild.id}`)
					return message.reply("El sistema de Anti-Links ahora esta desabilitado!")
					
				} else return message.reply("El sistema de Anti-Links ya estaba desabilitado!")
			}
		}

		
           //Getting Server's Config

	if(choice === 'config') {

		const configEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setTitle(`Menu de configuracion de ${message.guild.name}`)
		.setThumbnail(message.guild.iconURL({ dynamic : true }))
		.setDescription("Este es el estado actual de las funciones de Floppa Utilities")
		.addField(`\u200B`, "__General__")
		.addField("Canal de Bienvenidas", `${welcomeChannelStatus}`, true)
		.addField("Canal de Despedidas", `${leaveChannelStatus}`, true)
		.addField("Imagen de Bienvenidas", `${welcomeImageStatus}`, true)
		.addField("Mensaje de Bienvenidas", `${welcomeMessageStatus}`, true)
		.addField("Prefix", `\`${prefixStatus}\``, true)
		.addField('\u200B', "__Moderacion__")
		.addField("Canal de Logs", `${logsChannelStatus}`, true)
		.addField("Canal de Sugerencias", `${SugChannelStatus}`, true)
		.addField("\u200B", "Funcionalidades")
		.addField("AI ChatBot", `${chatbotChannelStatus}`, true)
		.addField("Sistema Anti-Links", `\`${antiLinkStatus}\``, true)
		.addField("Niveles", `\`${levelsStatus}\``, true)
		.addField("Canal de subida de nivel", `${levelsUpStatus}`, true)
	

		message.reply({ embeds: [configEmbed] })
	}

		
	}
}