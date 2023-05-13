const client = require("../index")
const Discord = require("discord.js")
const canvacord = require("canvacord");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const quickmongo = new Database(mongourl)
const format = require('string-format')
format.extend(String.prototype, {})

client.on("guildMemberAdd", async (member) => {
  //try{

	const welcomeImageCheck = await quickmongo.fetch(`welimg-${member.guild.id}`)
	const welcomeMessageCheck = await quickmongo.fetch(`welmsg-${member.guild.id}`)
        let background;

	if(welcomeImageCheck) {
		background = await quickmongo.get(`welimg-${member.guild.id}`)
	} else {
		background = "https://cdn.discordapp.com/attachments/1021935164038840380/1022651081878151218/unknown.png"
	}

	let welmsg;

	if(welcomeMessageCheck) {

		const msg = await quickmongo.get(`welmsg-${member.guild.id}`)

		welmsg = format(msg, member)
	} else {
		welmsg = `Hey ${member.user}, Bienvenido a  **${member.guild.name}**. Gracias por unirte a nuestro server!`
	}
	

	
	const welcomeChannelCheck = await quickmongo.fetch(`welcome-${member.guild.id}`)

	const welcomer = new canvacord.Welcomer()
	.setUsername(member.user.username)
	.setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
	.setGuildName(member.guild.name)
	.setAvatar(member.user.displayAvatarURL({ dynamic: false, format : "png" }))
	.setBackground(background)
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
	.setColor("message-count", "#fefede")
	.setColor("background", "#2f35e0")
	.setColor("border", "#faebd7")

	if(welcomeChannelCheck) {

		const getWelcomeChannel = await quickmongo.get(`welcome-${member.guild.id}`)
		const welcomeChannel = member.guild.channels.cache.get(getWelcomeChannel)
                 try {
		 welcomer.build().then(data => {
			const attachment = new Discord.MessageAttachment(data, 'welcome.png')
                        try{
			welcomeChannel.send({ content: `${welmsg}`, files: [attachment]});
			} catch(err) {
				console.log("f")
				quickmongo.delete(`welcome-${message.guild.id}`)
			}
		})
		 } catch(err) {
			 background = "https://cdn.discordapp.com/attachments/1021935164038840380/1022651081878151218/unknown.png"
		 }

		member.send(`Hey, Bienvenido a **${member.guild.name}**! Gracias por unirte!`).catch(err => console.log("Mensaje no se pudo dmear"))
	} else return
  //} //catch(err){
    //console.log(err)
  //}
})
//para que no se apague cuando ocurra un error, ok, esto anda mal no carga la imagen XD