const client = require("../index")
const Discord = require("discord.js")
const canvacord = require("canvacord")
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const quickmongo = new Database(mongourl)

client.on("guildMemberRemove", async (member) => {

	const LeaveChannelCheck = await quickmongo.fetch(`leave-${member.guild.id}`)

	const leaver = new canvacord.Leaver()
	.setUsername(member.user.username)
	.setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
	.setGuildName(member.guild.name)
	.setAvatar(member.user.displayAvatarURL({ dynamic: false, format : "png" }))
	.setBackground("https://media.discordapp.net/attachments/1021935164038840380/1022651081878151218/unknown.png?width=1083&height=609")
	.setColor("title", "#2f35e0")
	.setColor("title-borde", "#ffffff")
	.setColor("avatar", "#2f35e0")
	.setColor("username", "#000000")
	.setColor("username-box", "#c6e2ff")
	.setColor("hashtag", "#faebd7")
	.setColor("discriminator", "#000000")
	.setColor("discriminator-box", "#2f35e0")
	.setColor("message", "#faebd7")
	.setColor("message-box", "#2f35e0")
	.setColor("background", "#2f35e0")
	.setColor("border", "#faebd7")

	if(LeaveChannelCheck) {

		const getLeaveChannel = await quickmongo.get(`leave-${member.guild.id}`)
		const leaveChannel = member.guild.channels.cache.get(getLeaveChannel)

		leaver.build().then(data => {
			const attachment = new Discord.MessageAttachment(data, 'leave.png');
                        try{
			leaveChannel.send({ content: `Oh ${member.user}, Acaba de dejar **${member.guild.name}**`, files: 
			[attachment]})
			} catch(err) {
				console.log("f2")
			}
		})
	}
	
})
