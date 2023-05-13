const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo")
const mongourl = process.env['mongourl']
const db = new Database(mongourl)
module.exports = {
	name: 'rob',
	aliases: ['robar'],
	description: "Roba dinero a alguien! Puedes robarle el dinero, pero si sale mal perderas dinero",
	usage: ".register",
	cooldown: 4,

	async execute (client, message, cmd, args, Discord) {


		const user = await db.get(`economy-${message.author.id}-${message.guild.id}`)
		if(user  === null) return message.reply("No estas registrado en la Economia de floppa utilities!")

		const usuario = message.author
		const persona = message.mentions.users.first()

		if(!persona) return message.reply("Debes mencionar a una persona!")

		let dinerouser = await db.get(`economy-${usuario.id}-${message.guild.id}.balance`)
		let dineropersona = await db.get(`economy-${persona.id}-${message.guild.id}.balance`)
		let dineropersona1 = await db.get(`economy-${persona.id}-${message.guild.id}.balance`)
                
			let dineroaleatorio = Math.floor(Math.random() * dineropersona) + 1
	                 let dineroaleatoriomio = Math.floor(Math.random() * dinerouser) + 450
		if(dineropersona1 === null) return message.reply("El usuario no esta registrado en la economia de Floppa Utilities!")

		if(persona.id === message.author.id) return message.reply("No te puedes robar a ti mismo!")
		if(!isNaN(args[0])) return message.reply("El usuario que mencionaste no es valido!")

		if(dineropersona < 650) return message.reply("Esta persona tiene muy poco dinero como para robarle!")

		let resultadomalo = ['mal']
		let resultadobueno = ['bien']
		let resultados = [resultadomalo, resultadobueno, resultadobueno, resultadomalo]
		let resultadofinal = resultados[Math.floor(Math.random() * resultados.length)]

		if(resultadofinal === resultadobueno){
			db.add(`economy-${persona.id}-${message.guild.id}.balance`, -dineroaleatorio)
			db.add(`economy-${usuario.id}-${message.guild.id}.balance`, dineroaleatorio)

			message.reply(`**Has robado a ${persona.tag} y has conseguido ${dineroaleatorio}**`)
		}
		if(resultadofinal === resultadomalo){
			db.add(`economy-${usuario.id}-${message.guild.id}.balance`, -dineroaleatoriomio)

			message.reply(`**Has intentado robar a ${persona.tag} y has perdido ${dineroaleatoriomio}**`)
		}
               
		

	}
}