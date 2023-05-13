const ms = require("ms")
module.exports = {
	name: "unban",
	description: "Desbanea un miembro",
	usage: ".unban",
	UserPerms: ["BAN_MEMBERS"],
	BotPerms: ["BAN_MEMBERS"],
	cooldown: 5,

	async execute (client, message, cmd, args, Discord) {

		const id = args[0]

		if(!id) return message.reply("Please provide a user id first!")

		if(isNaN(id)) return message.reply("The user id should be a Integer")

		const bannedMembers = await message.guild.bans.fetch()

		if(!bannedMembers.find((user) => user.user.id === id))return message.reply("The member is not banned!")

		if(!args[0]) return message.reply("Please mention a member first!")


		const row = new Discord.MessageActionRow().addComponents(

			new Discord.MessageButton()
			.setStyle('DANGER')
			.setCustomId("unbanyes")
			.setLabel("Yes"),

			new Discord.MessageButton()
		        .setStyle("PRIMARY")
		        .setCustomId("unbanno")
		        .setLabel("No"),
		
		)

		let unbanAskEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription("⚠️ - Do you really want to unban this member?")

		let unbanEndEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription("Thanks for using Floppa Utilities to use this command!")

		let reason = args.slice(1).join(" ")
		if(!reason) reason = "No reason Provided"

		let unbanEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`${id} has successfully been unbaned for : ${reason}`)

		let unbanEmbed2 = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`Cancelled Unban Request!`)

		const unbanPage = await message.reply({ embeds: [unbanAskEmbed], components: [row] })

		const col = await unbanPage.createMessageComponentCollector({
			componentType: "BUTTON",
			time: ms('10s'),
		})

		col.on('collect', i => {

			if(i.user.id !== message.author.id) return

			if(i.customId === 'unbanyes') {

				message.guild.members.unban(id)

				unbanPage.edit({ embeds: [unbanEmbed], components: [] })
			}
			
			else if(i.customId === 'unbanno') {

				unbanPage.edit({ embeds: [unbanEmbed2], components: [] })
			}
		})

		col.on('end', () => {

			unbanPage.edit({ embeds: [unbanEndEmbed], components: [] })
		})
	}
}