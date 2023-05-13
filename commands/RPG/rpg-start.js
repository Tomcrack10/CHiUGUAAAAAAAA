const model = require("../../Models/rpg")
module.exports = {
	name: 'rpg-start',
	aliases: [],
	description: "Regístrate en el Floppa RPG",
	usage: ".rpg-start",
	cooldown: 10,
	BotPerms:["MANAGE_MESSAGES"],

  async	execute(client, message, cmd, args, Discord) {
    const user = await model.findOne({user: message.author.id})
    if(user) return message.reply("Ya estás registrado en el Floppa RPG")
    const register = new model({
      user: message.author.id
    })
    register.save()
    message.channel.send("Ya puedes jugar en el Floppa RPG!")
	}
}