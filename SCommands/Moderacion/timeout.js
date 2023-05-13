const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const perm = "MODERATE_MEMBERS"
const ms = require("ms")

module.exports = {
	name: "timeout",
	description: "Dale un timeout a un miembro por un tiempo especifico",
	options: [
		{
			name: "añadir",
			description: "Añade un timeout a un miembro con una duracion especifica",
			type: "SUB_COMMAND",
			options: [
				{
					name: "usuario",
					description: "Selecciona el usuario",
					type: "USER",
					required: true
				},
				{
					name: "duracion",
					description: "Selecciona la duracion del timeout",
					type: "STRING",
					required: true,
					choices: [
						{
							name: "60 SEG",
							value: "60 SEG"
						},
						{
							name: "5 MIN",
							value: "5 MIN"
						},
						{
							name: "10 MIN",
							value: "10 MIN"
						},
						{
							name: "1 HORA",
							value: "1 HORA"
						},
						{
							name: "1 DIA",
							value: "1 DIA"
						},
						{
							name: "1 SEMANA",
							value: "1 SEMANA"
						},
					]
				},
				{
					name: "razon",
					description: "Da la razon del timeout",
					type: "STRING",
					required: false
				},
			]
		},
		{
			name: "remover",
			description: "Remueve un timeout a un miembro",
			type: "SUB_COMMAND",
			options: [
				{
					name: "usuario",
					description: "Selecciona el usuario",
					type: "USER",
					required: true
				}
			]
			
		},
	],

	/**
	*@param {Client} client
	*@param {CommandInteraction} interaction
	*/
	 async execute(interaction, client) {

          if(!interaction.member.permissions.has(perm)) return interaction.reply("NO TIENES PERMISO PARA EJECUTAR ESTE COMANDO")
		
		const { guild, options } = interaction


		 switch (options.getSubcommand()) {
			 case "añadir": {

				 const member = options.getMember("usuario")
				 const time = options.getString("duracion")
				 const reason = options.getString("razon") || "!! - No se ha dado razon"

				 if(guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({
					 embeds: [
						 new MessageEmbed()
						 .setColor("BLUE")
						 .setDescription("!! - No puedo ejecutar este comando, por favor coloca mi rol por encima del rol del miembro en **ROLES**")
						 
					 ],
					 ephemeral: true
				 })

				 if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({
					 embeds: [
						 new MessageEmbed()
						 .setColor("BLUE")
						 .setDescription("!! - No puedes darle un timeout a un miembro de tu mismo nivel de rol o mayor!")
					 ],
					 ephemeral: true
				 })

				 switch (time) {
						 case "60 SEG": {
							member.timeout(ms("60s"), reason)

							 interaction.reply({
								 embeds: [
									 new MessageEmbed()
									 .setColor("BLUE")
									 .setDescription(`:white_check_mark: - ${member} ha sido timeado por **60 Segundos** por: ${reason}`)
								 ]
							 })
						 }
						 break;
						 case "5 MIN": {
							member.timeout(ms("5m"), reason)

							 interaction.reply({
								 embeds: [
									 new MessageEmbed()
									 .setColor("BLUE")
									 .setDescription(`:white_check_mark: - ${member} ha sido timeado por **5 Minutos** por: ${reason}`)
								 ]
							 })
						 }
						 break

						 case "10 MIN": {
							member.timeout(ms("10m"), reason)

							 interaction.reply({
								 embeds: [
									 new MessageEmbed()
									 .setColor("BLUE")
									 .setDescription(`:white_check_mark: - ${member} ha sido timeado por **10 Minutos** por: ${reason}`)
								 ]
							 })
						 }
						 break;
						  case "1 HORA": {
							member.timeout(ms("1h"), reason)

							 interaction.reply({
								 embeds: [
									 new MessageEmbed()
									 .setColor("BLUE")
									 .setDescription(`:white_check_mark: - ${member} ha sido timeado por **1 Hora** por: ${reason}`)
								 ]
							 })
						 }
						 break;

						  case "1 DIA": {
							member.timeout(ms("1d"), reason)

							 interaction.reply({
								 embeds: [
									 new MessageEmbed()
									 .setColor("BLUE")
									 .setDescription(`:white_check_mark: - ${member} ha sido timeado por **1 Dia** por: ${reason}`)
								 ]
							 })
						 }
						 break;

						 case "1 SEMANA": {
							member.timeout(ms("7d"), reason)

							 interaction.reply({
								 embeds: [
									 new MessageEmbed()
									 .setColor("BLUE")
									 .setDescription(`:white_check_mark: - ${member} ha sido timeado por **1 Semana** por: ${reason}`)
								 ]
							 })
						 }
						 break;
				 }
				 break;
				 
			 }
				  case "remover": {

			 	const member = options.getMember("usuario")

				 if(guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({
					 embeds: [
						 new MessageEmbed()
						 .setColor("BLUE")
						 .setDescription("!! - No puedo ejecutar este comando, por favor coloca mi rol por encima del rol del miembro en **ROLES**")
						 
					 ],
					 ephemeral: true
				 })

				 if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({
					 embeds: [
						 new MessageEmbed()
						 .setColor("BLUE")
						 .setDescription("!! - No puedes darle un timeout a un miembro de tu mismo nivel de rol o mayor!")
					 ],
					 ephemeral: true
				 })

				interaction.reply({ 
					embeds: [
						new MessageEmbed()
						.setColor("BLUE")
						.setDescription(`:white_check_mark: Se ah quitado el timeout de ${member}`)
					]
						})
			          member.timeout(null)
		

			 
		                }
				break;	
		 }
		

		 


		
		
		
		
	}
}