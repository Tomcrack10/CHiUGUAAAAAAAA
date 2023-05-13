module.exports = {
	name: 'simjoin',
	aliases: ['join'],
	description: "Simula que alguien se une",

	execute (client, message, cmd, args, Discord) {

		if(message.author.id !== "590606524682993751") return message.reply("This command is classified!")

		client.on("guildMemberAdd", member => {
			message.channel.send("Simulated Join event")
		})

		client.emit("guildMemberAdd", message.member)
	       }
	}