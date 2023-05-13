const { GuildMember } = require('discord.js');
const {rps} = require("discord.js-games")
module.exports = {
	name: 'rps',
	aliases: ["ppt"],
	description: "Juega piedra papel o tijera",
	usage: ".rps",
	cooldown: 10,
	BotPerms:["MANAGE_MESSAGES"],

  async	execute(client, message, cmd, args, Discord) {
    const opponent = message.mentions.members?.first();
    rps({
      title: 'Piedra, papel o tijera',
      tieMessage: 'Empate!',
      winMessage: '{user} le ganó a {opponent}',
		  timeEndMessage: 'El tiempo se acabó, nadie ganó',
      message,
      ...(opponent instanceof GuildMember && { opponent })
    });
	}
}