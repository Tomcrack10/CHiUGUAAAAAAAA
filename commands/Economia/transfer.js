
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'transfer',
	aliases: ['transferir', 'trans'],
	description: "Transfiere dinero a alguien mas!",
	usage: ".register",
	cooldown: 10,
	BotPerms:["MANAGE_MESSAGES"],

  async execute (client, message, cmd, args, Discord) {


		const user1 = await db.get(`economy-${message.author.id}-${message.guild.id}`)
		if(user1 === null) return message.reply("No estas registrado en la Economia de floppa utilities!")

                let user = message.mentions.users.first();
                if(!user) return message.channel.send('Mencione a alguien');
                let amount = message.content.split(' ').slice(2).join(' ');
   		if(!amount) return message.channel.send('Especifique una cantidad');
	  	if(user.id === message.author.id) return message.channel.send('No puedes transferirse a si mismo');
		if(isNaN(amount)) return message.channel.send('Especifique una cantidad válida');
		let bal = await db.fetch(`economy-${message.author.id}-${message.guild.id}.balance`);
		if(bal < amount) return message.channel.send('No tienes suficiente dinero');
		const inte = parseInt(amount)
	  	db.add(`economy-${user.id}-${message.guild.id}.balance`, inte);
		db.subtract(`economy-${message.author.id}-${message.guild.id}.balance`, inte);
	        message.reply(`:white_check_mark: - **Has transferido ${amount} correctamente a ${user.username}**`)

	}
}
