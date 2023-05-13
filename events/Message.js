require('dotenv').config()
const client = require("../index")
const Discord = require('discord.js')
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const quickmongo = new Database(mongourl)
const cooldowns = new Map()
const blacklist = require('../Models/blacklist')


client.on("messageCreate", async (message) => {
	//try {
	if(message.author.bot || !message.guild) return

        const prefixes = await quickmongo.fetch(`prefix-${message.guild.id}`)
        let prefix;
		
	if(prefixes == null) {
		prefix =  process.env['prefix']
	} else {
		prefix = prefixes
	}
	if(message.content === `<@!${client.user.id}>` ||message.content === `<@${client.user.id}>` ) return message.channel.send(`Mi prefix en este servidor es: ${prefix}\nPara ver todos mis comandos escribe: ${prefix}help`)

	if(!message.content.startsWith(prefix)) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const cmd = args.shift().toLowerCase()

	const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd))
	if(command) {

		if (!cooldowns.has(command.name)) {

			cooldowns.set(command.name, new Discord.Collection())
		}

		const currentTime = Date.now()
		const timeStamps = cooldowns.get(command.name)
		const cooldownAmount = (command.cooldown) * 1000

		if(timeStamps.has(message.author.id)) {

			const expTime = timeStamps.get(message.author.id) + cooldownAmount

			if(currentTime < expTime) {

				const timeLeft = (expTime - currentTime) / 1000

				const tmotEmbed = new Discord.MessageEmbed()
				.setColor("RED")
				.setDescription(`❌ - Por favor espera \`${timeLeft.toFixed(1)}\` segundos antes de utilizar de nuevo \`${command.name}\`!`)

				return message.reply({embeds: [tmotEmbed]})
			}
		}

		timeStamps.set(message.author.id, currentTime)

		setTimeout(() => {
			timeStamps.delete(message.author.id)
		}, cooldownAmount)

		const momsgEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription("❌ - Necesito al menos los permisos de `SEND MESSAGES`, `EMBED LINKS` para ejecutar cualquier comando en este server!")

		const bpEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`❌ - Necesito el permiso(s) \`${command.BotPerms || []}\` para ejecutar este comando! `)


		const upEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`❌ - Necesitas el permiso(s) \`${command.UserPerms || []}\` Para ejecutar este comando!`)

		if(!message.guild.me.permissions.has(["SEND_MESSAGES", "EMBED_LINKS"])) return message.reply({embeds : [momsgEmbed]})

		//if(!message.member.id === "590606524682993751") {
		if(!message.member.permissions.has(command.UserPerms || [])) return message.reply({embeds : [upEmbed]})
		//}

		if(!message.guild.me.permissions.has(command.BotPerms || [])) return message.reply({embeds : [bpEmbed]})

		blacklist.findOne({ id: message.author.id }, async (err, data) => {
                if (err) throw err;

                if(!data){
                owners = ["590606524682993751", "650333757525458966"]
		if(command.owner){
			if(!owners.includes(message.author.id)) return message.reply(":x: Este comando solo lo pueden usar mis owners")
		}
		command.execute(client, message, cmd, args, Discord)
		} else message.reply("Estas en la blacklist!")
			
	    })
	}
})