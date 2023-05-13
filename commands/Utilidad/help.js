const { MessageEmbed, Message, Client } = require("discord.js")
const { readdirSync } = require("fs")
require('dotenv').config()
const { Database } = require("quickmongo")
const mongourl = process.env.mongourl
const quickmongo = new Database(mongourl)
let color = "RED"
const create_mh = require(`../../functions/menu`)

module.exports = {
	name: "help",
	aliases: [`h`],
	description: "Muestra todos los comandos disponibles del bot",
	usage: '.help or .help <categoria> o .help <nombre del comando>',
	cooldown: 1,

	async execute(client, message, cmd, args, Discord) {

		try {
			const prefixes = await quickmongo.fetch(`prefix-${message.guild.id}`)

		        if (prefixes == null) {
				prefix = process.env.prefix
			} else {
				prefix = prefixes
			}

			let categories = []
			let cots = []

			if(!args[0]) {

			let ignored = ["Monopoly"]

				
	                 const emojiA = "🪀"
                         const emojiB = "👑"
	                 const emojiC = "💾"
                         const emojiD = "💾"
	                 const emojiE = "✨"
	                 const emojiF = "💾"
	                 const emojiG = "💾"
                	 const emojiH = "🎮"
	                 const emojiI = ":shield:"
                         const emojiJ = "📢"
	                 const emojiK = "⛔"
	                 const emojiL = ":moneybag:"
	                 const emojiM = "⚔️"

	                const emo = {

		        Comunidad: `${emojiA}`,
		        Informacion: `${emojiC}`,
		        Moderacion: `${emojiB}`,
		        Utilidad: `${emojiE}`,
	                Owner: `${emojiK}`,
		        Juegos: `${emojiH}`,
		        RPG: `${emojiM}`,
			Reportes: `${emojiJ}`,
			Economia: `${emojiL}`,
			Sugerencias: `${emojiI}`
		
	                }

				let ccate = []

				readdirSync("./commands/").forEach((dir) => {

					if(ignored.includes(dir.toLowerCase())) return

					const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"))

					if(ignored.includes(dir.toLowerCase())) return

					const name = `${emo[dir]} - ${dir}`

					let nome = dir.toUpperCase()
					let cats = new Object()

					cats = {
						name: name,
						value: `\`${prefix}help ${dir.toLowerCase()}\``,
						inline: true
					}

					categories.push(cats)
					ccate.push(nome)
				})
				const helpEmbed = new Discord.MessageEmbed()
				.setTitle(`Comandos del bot`)
				.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
				.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
				.setDescription(`Mi prefix en este server es \`${prefix}\`.\nPara ver la pagina de comandos, usa \`${prefix}help [Categoria]\` o \`${prefix}help [comando]\`!`)
				.addField('\u200B', '__Categorias__')
				.addFields(categories)
				.addField('\u200B', '\u200B')
				.addField(`\u200B`, `${emojiD} [Invitacion](https://discord.com/oauth2/authorize?client_id=1016854204532412486&permissions=8&scope=applications.commands%20bot) \`|\` ${emojiF} [Servidor de Soporte](https://discord.gg/yxcEaZeGYM) `)
				.setFooter('Comando help!')
				.setTimestamp()
				.setColor(color)

				let menus = create_mh(ccate)

				return message.reply({ embeds: [helpEmbed], components: menus.smenu }).then((msgg => {

					const menuID = menus.sid

					const select = async (interaction) => {

						if(interaction.customId != menuID) return

						let { values } = interaction
						let value = values[0]
						let catts = []

						readdirSync("./commands/").forEach((dir) => {

							if(dir.toLowerCase() !== value.toLowerCase()) return
							const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
								file.endsWith(".js")
							)
							const cmds = commands.map((command) => {

								let file = require(`../../commands/${dir}/${command}`)

								if(!file.name) return "Comando sin nombre."

								let name = file.name.replace(".js", "")

								if(client.commands.get(name).hidden) return

								let des = client.commands.get(name).description
								let emo = client.commands.get(name).emoji
								let emoe = emo ? `${emo} - ` : ``

								let obj = {
									cname: `${emoe}\`${name}\``,
									des
								}

								return obj
							})
							let dota = new Object()

							cmds.map(co => {

								if(co == undefined) return

								dota = {
									name: `${cmds.lenght === 0 ? "En progreso." : co.cname}`,
									value: co.des ? co.des : `Sin descripcion`,
									inline: true,
								}
								catts.push(dota)
							})

							cots.push(dir.toLowerCase())
						})

						if(cots.includes(value.toLowerCase())) {

							const coembed =  new MessageEmbed()
							.setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Comandos!__`)
							.setDescription(`Usa \`${prefix}help\` Seguido del nombre del comando para obtener mas informacion de este. \nPor ejemplo \`${prefix}help ping\`.\n\n`)
							.addFields(catts)
							.setColor(color)

							await interaction.deferUpdate()

							return interaction.message.edit({
								embeds: [coembed],
								components: menus.smenu
							})
		
						}
					}

					const filter = (interaction) => {
						return !interaction.user.bot && interaction.user.id == message.author.id
					}

					const collector = msgg.createMessageComponentCollector({
						filter,
						componentType: "SELECT_MENU"
					})

					collector.on("collect", select)
					collector.on("end", () => null)
				}))
			 
			} else {

				let catts = []

				readdirSync("./commands/").forEach((dir) => {

					if(dir.toLowerCase() !== args[0].toLowerCase()) return
					

							const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
								file.endsWith(".js")
							)
							const cmds = commands.map((command) => {

								let file = require(`../../commands/${dir}/${command}`)

								if(!file.name) return "No command name."

								let name = file.name.replace(".js", "")

								if(client.commands.get(name).hidden) return

								let des = client.commands.get(name).description
								let emo = client.commands.get(name).emoji
								let emoe = emo ? `${emo} - ` : ``

								let obj = {
									cname: `${emoe}\`${name}\``,
									des
								}

								return obj
							})
							let dota = new Object()

							cmds.map(co => {

								if(co == undefined) return

								dota = {
									name: `${cmds.lenght === 0 ? "En progreso." : co.cname}`,
									value: co.des ? co.des : `Sin descripcion`,
									inline: true,
								}
								catts.push(dota)
							})
					 cots.push(dir.toLowerCase())



					
				})
				const command = 
						client.commands.get(args[0].toLowerCase()) ||
								   client.commands.find(
									   (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
								   )

							if(cots.includes(args[0].toLowerCase())) {

							const coembed =  new Discord.MessageEmbed()
							.setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Comandos!__`)
							.setDescription(`Usa \`${prefix}help\` seguido del nombre del comando para obtener mas informacion de este. \nPor Ejemplo \`${prefix}help ping\`.\n\n`)
							.addFields(catts)
							.setColor(color)
								return message.reply({
						         embeds: [coembed]
				                        })
					}

			        if(!command) {

					const embed = new MessageEmbed()
					.setTitle(`Comando Invalido! Usa \`${prefix}help\` Para ver todos mis comandos!`)
					.setColor("RED")

					return await message.reply({
						embeds: [embed]
					})
				}

				const embed = new Discord.MessageEmbed()
				.setTitle("Detalles del Comando:")
				.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
				.addField("Comando:", command.name ? `\`${command.name}\`` : "No se ah dado ningun nombre para este comando")
				.addField("Alias:", command.aliases ? `\`${command.aliases.join("` `")}\`` :  "No alias dados para este comando")
		                .addField("Descripcion del Comando:", command.description ? command.description :  "No descripcion dada para este comando")
				.addField("Uso:", command.usage ? `\`${command.usage}\`` : "No se ah dado ningun uso para este comando")
				.setTimestamp()
				.setColor(color)
				return await message.reply({
					embeds: [embed]
				})
				} 
			} catch (err) {
			          message.reply("Un error ah ocurrido!")
			         console.log(err)
				}
		}
}