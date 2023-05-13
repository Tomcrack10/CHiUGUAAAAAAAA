const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'crime',
	aliases: ['crimen', 'crm'],
	description: "Comete un crimen en la economia de floppa utilities, Puede que pierdas dinero o lo ganes! ",
	usage: ".register",
	cooldown: 3,
	BotPerms:["MANAGE_MESSAGES"],

	async execute (client, message, cmd, args, Discord) {

		const user = await db.fetch(`economy-${message.author.id}-${message.guild.id}`)
		if(user  === null) return message.reply("No estas registrado en la Economia de floppa utilities! Utiliza f!register para registrarte!")
                
		let crimenesbien = ["ha robado un banco", "robo una joyeria", "robo una tienda", "robo un museo", "robo una casa"]
		let crimenesmal = ["ha robado un banco pero lo han descubierto", "robo una joyeria, no encontro escape, y fue atrapado", "robo una tienda, pero la policia estaba cerca y lo atrapo", "robo un museo, pero se equivoco y resbalo, por lo que lo atraparon", "robo una casa pero se quedo encerrado, por lo que lo atraparon"]
                 let resultadobien = crimenesbien[Math.floor(Math.random() * crimenesbien.length)]
		let resultadomal = crimenesmal[Math.floor(Math.random() * crimenesmal.length)]

		let resultados = [resultadobien, resultadomal]
		let resultadofinal = resultados[Math.floor(Math.random() * resultados.length)]
                let randomal =  Math.floor(Math.random() * (-1000 - 250 + 1) - 50)
		let randombien = Math.floor(Math.random() * (1000 - 250 + 1) + 50)
		const usuario = message.author

			if(resultadofinal === resultadobien) {
					        const econgodEmbed = new Discord.MessageEmbed()
		                                 .setColor("GREEN")
		                                 .setTitle("Crimen")
	                         	          .setDescription(`**El usuario ${usuario} ${resultadobien} y obtuvo ${randombien}$**`)
		                                   db.add(`economy-${message.author.id}-${message.guild.id}.balance`, randombien)
		                                  message.reply({ embeds: [econgodEmbed] })
			}
				
			if(resultadofinal === resultadomal){
				const econbadEmbed = new Discord.MessageEmbed()
		                                 .setColor("RED")
		                                 .setTitle("Crimen")
	                         	          .setDescription(`**El usuario ${usuario} ${resultadomal} y perdio ${randomal}$**`)
		                                   db.add(`economy-${message.author.id}-${message.guild.id}.balance`, randomal)
		                                  message.reply({ embeds: [econbadEmbed] })
			}
			
		
		

		

	}
}