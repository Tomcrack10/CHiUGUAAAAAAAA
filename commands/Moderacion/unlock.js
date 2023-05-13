module.exports = {
	name: "unlock",
	description: "Expulsa a un miembro",
	usage: ".unlock",
	UserPerms: ["ADMINISTRATOR"],
	BotPerms: ["MANAGE_ROLES"],
	cooldown: 5,

     execute (client, message, cmd, args, Discord) {
	const channel = message.channel || message.mentions.channels.first()

        // Guild ID is the same as the everyone role ID

        channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: true,
        }).catch(err => console.log(err))

	const unlockEmbed = new Discord.MessageEmbed()
	     .setTitle("Canal desbloqueado")
	     .setDescription(`${channel} ah sido desbloqueado`)
	     .setTimestamp()

        channel.send({ embeds: [unlockEmbed] });

	}
}