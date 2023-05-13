const { GuildMember } = require('discord.js');
const {connectFour} = require("discord.js-games")
module.exports = {
	name: 'conecta4',
	aliases: ['conectacuatro','conecta-cuatro','conecta-4','4enraya','3enraya'],
	description: "Juega conecta 4 (4 en raya)",
	usage: ".conecta4",
	cooldown: 10,
	BotPerms:["MANAGE_MESSAGES"],

  async	execute(client, message, cmd, args, Discord) {
    const opponent = message.mentions.members?.first();
    connectFour({
      title: 'Conecta 4',
      tieMessage: 'Empate!',
      winMessage: '{user} le ganó a {opponent}',
		  timeEndMessage: 'El tiempo se acabó, nadie ganó',
      message,
      ...(opponent instanceof GuildMember && { opponent })
    });
	}
}