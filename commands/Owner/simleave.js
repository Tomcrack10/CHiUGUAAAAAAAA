module.exports = {
	name: 'simleave',
	aliases: ['leave'],
	description: "Simula que alguien se va",

	execute (client, message, cmd, args, Discord) {

		if(message.author.id !== "590606524682993751") return message.reply("This command is classified!")

		client.on("guildMemberRemove", member => {
			message.channel.send("Simulated Leave event")
		})

		client.emit("guildMemberRemove", message.member)
	       }
	}