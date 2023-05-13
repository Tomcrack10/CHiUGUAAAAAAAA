module.exports = {
	name: 'reportbug',
	aliases: ['bugreport', 'rptbug'],
	description: "Reporta un bug de floppa utilities",
	execute (client, message, cmd, args, Discord) {

		  const reporte = args.join(" ")
  if(!reporte) return message.channel.send("Debes decir el reporte!")

  const embed = new Discord.MessageEmbed()

  .setTitle("Reporte")
  .setDescription(`El usuario **${message.author.username}** ha hecho un reporte desde el servidor **${message.guild.name}**. Reporte: \n\n**${reporte}**`)
  .setFooter("Bug en investigacion")
  .setColor("RED")

  client.users.cache.get('590606524682993751').send({embeds: [embed]})
  client.channels.cache.get('1029081557601898507').send({embeds: [embed]})
  message.channel.send("El reporte del bug fue enviado **correctamente**")

	 
          
	
}
	}