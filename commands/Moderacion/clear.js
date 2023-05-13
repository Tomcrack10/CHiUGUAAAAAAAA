module.exports = {
	name: "clear",
	description: "Limpia un numero de mensajes determinado",
	usage: ".clear <number>",
	UserPerms: ["MANAGE_MESSAGES"],
	BotPerms: ["MANAGE_MESSAGES"],
	cooldown: 1,

	async execute (client, message, cmd, args, Discord) {

		if(!args[0]) return message.reply("Coloca el numero de mensajes a limpiar")

		if(isNaN(args[0])) return message.reply("El numero de mensajes a eliminar debe ser entero!")

		if(args[0] > 100) return message.reply("No puedes eliminar mas de 100 mensajes!")

		if(args[0] < 1) return message.reply("No puedes borrar menos de 1 mensaje!")

		const messages = args[0]

		await message.channel.bulkDelete(messages, true).catch(err => {

			if(err.code !==10008) return console.log(err)
		})

	
	}
}