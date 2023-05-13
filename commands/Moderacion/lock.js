module.exports = {
	name: "lock",
	description: "Bloquea un canal para que los demas usuarios no administradores no puedan escribir",
	usage: ".lock",
	UserPerms: ["ADMINISTRATOR"],
	BotPerms: ["MANAGE_ROLES"],
	cooldown: 5,

     execute (client, message, cmd, args, Discord) {
	const channel = message.channel || message.mentions.channels.first()

        // Guild ID is the same as the everyone role ID

        channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false,
        }).catch(err => console.log(err))

	const lockEmbed = new Discord.MessageEmbed()
	     .setTitle("Canal Bloqueado")
	     .setDescription(`${channel} ha sido bloqueado`)
	     .setTimestamp()

        channel.send({ embeds: [lockEmbed] });

	}
}