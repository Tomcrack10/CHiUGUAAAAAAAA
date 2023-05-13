module.exports = {
	name: 'simboost',
	aliases: ['boost'],
	description: "Simula que alguien se une",
	owner: true,

	execute (client, message, cmd, args, Discord) {

		//if(message.author.id !== "590606524682993751") return message.reply("This command is classified!")

		client.on("guildMemberBoost", member => {
			message.channel.send("Simulated Boost event")
		})

		client.emit("guildMemberBoost", message.member)
	       }
	}