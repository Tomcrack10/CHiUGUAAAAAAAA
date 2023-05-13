const Discord = require('discord.js')
const client = require('../index')
const { Database } = require('quickmongo')
const mongourl = process.env['mongourl']
const quickmongo = new Database(mongourl)
const logs = require('discord-logs');
logs(client);

const color = 'RED'

//When a member gets a role
client.on("guildMemberRoleAdd", async (member, role) => {

	const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const raddEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Actualizacion de Miembro`)
	.setColor(color)
	.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
	.setDescription(`**${member.user.tag}** Obtuvo el rol: \`${role.name}\``)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return member.guild.channels.cache.get(logsChannel).send({ embeds:  [raddEmbed] })
	} catch (err) {
		console.log(err)
	}
})

//When a member loses a role
client.on("guildMemberRoleRemove", async (member, role) => {

	const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const rrmvEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Actualizacion de Miembro`)
	.setColor(color)
	.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
	.setDescription(`**${member.user.tag}** ah perdido el rol: \`${role.name}\``)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return member.guild.channels.cache.get(logsChannel).send({ embeds:  [rrmvEmbed] })
	} catch (err) {
		console.log(err)
	}
})

//When a member's nickname is updated
client.on("guildMemberNicknameUpdate", async (member, oldNickname, newNickname) => {

	const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const nickchEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Actualizacion de Apodo`)
	.setColor(color)
	.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
	.setDescription(`El apodo de **${member.user.tag}** ah cambiado de: \`${oldNickname}\` a: \`${newNickname}\``)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return member.guild.channels.cache.get(logsChannel).send({ embeds:  [nickchEmbed] })
	} catch (err) {
		console.log(err)
	}
})

client.on("guildChannelTopicUpdate", async (channel, oldTopic, newTopic) => {

	const logsChannel = await quickmongo.fetch(`logs-${channel.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const tchEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Actualizacion de Tema`)
	.setColor(color)
	.setThumbnail(channel.guild.iconURL({ dynamic: true }))
	.setDescription(`El tema del canal: **${channel}** ah cambiado de: **${oldTopic} a: **${newTopic}**`)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return channel.guild.channels.cache.get(logsChannel).send({ embeds:  [tchEmbed] })
	} catch (err) {
		console.log(err)
	}
})

client.on("guildMemberBoost", async (member) => {

	const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const bstEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Servidor Boosteado`)
	.setColor(color)
	.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
	.setDescription(`**${member.user.tag}** ah iniciado a boostear: **${member.guild.name}**`)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return member.guild.channels.cache.get(logsChannel).send({ embeds:  [bstEmbed] })
	} catch (err) {
		console.log(err)
	}
})

client.on("guildMemberUnboost", async (member) => {

	const logsChannel = await quickmongo.fetch(`logs-${member.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const bstnEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Boost del servidor detenido`)
	.setColor(color)
	.setThumbnail(member.guild.displayAvatarURL({ dynamic: true }))
	.setDescription(`**${member.user.tag}** ah dejado de boostear: **${member.guild.id}**`)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return role.guild.channels.cache.get(logsChannel).send({ embeds:  [bstnEmbed] })
	} catch (err) {
		console.log(err)
	}
})

client.on("roleCreate", async (role) => {

	const logsChannel = await quickmongo.fetch(`logs-${role.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const rcEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Rol creado`)
	.setColor(color)
	.setDescription(`Un rol ah sido creado con el nombre: ${role}, \`${role.name}\``)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return role.guild.channels.cache.get(logsChannel).send({ embeds:  [rcEmbed] })
	} catch (err) {
		console.log(err)
	}
})

client.on("roleDelete", async (role) => {

	const logsChannel = await quickmongo.fetch(`logs-${role.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const rdelEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Rol Eliminado`)
	.setColor(color)
	.setDescription(`Un rol a sido Eliminado Llamado: ${role}, \`${role.name}\``)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return role.guild.channels.cache.get(logsChannel).send({ embeds:  [rdelEmbed] })
	} catch (err) {
		console.log(err)
	}
})

client.on("messageDelete", async (message) => {

	const logsChannel = await quickmongo.fetch(`logs-${message.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const msgdelEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Mensaje Eliminado`)
	.setColor(color)
	.setDescription(`Un mensaje a sido eliminado <#${message.channel.id}>.`)
	.addField("Mensaje",`El contenido del mensaje era el siguiente: **${message.content}**`)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return message.guild.channels.cache.get(logsChannel).send({ embeds:  [msgdelEmbed] })
	} catch (err) {
		console.log(err)
	}
})

client.on("channelCreate", async (channel) => {

	const logsChannel = await quickmongo.fetch(`logs-${channel.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const chcrEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Canal Creado`)
	.setColor(color)
	.setDescription(`Un canal a sido creado con el nombre: ${channel}, \`${channel.name}\``)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return channel.guild.channels.cache.get(logsChannel).send({ embeds:  [chcrEmbed] })
	} catch (err) {
		console.log(err)
	}
})

client.on("channelDelete", async (channel) => {

	const logsChannel = await quickmongo.fetch(`logs-${channel.guild.id}`)
	if(!logsChannel) return

	const logsEmoji = "💡"

	const chdeEmbed = new Discord.MessageEmbed()
	.setTitle(`${logsEmoji} - Canal Eliminado`)
	.setColor(color)
	.setDescription(`Un canal a sido eliminado llamado: ${channel}, \`${channel.name}\``)
	.setFooter(`Log detected`)
	.setTimestamp()

	try {
		return channel.guild.channels.cache.get(logsChannel).send({ embeds:  [chdeEmbed] })
	} catch (err) {
		console.log(err)
	}
})

