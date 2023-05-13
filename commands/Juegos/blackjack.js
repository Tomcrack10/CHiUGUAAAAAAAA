const {blackjack} = require("discord.js-games")
module.exports = {
	name: 'blackjack',
	aliases: ["bj"],
	description: "Juega blackjack",
	usage: ".blackjack",
	cooldown: 10,
	BotPerms:["MANAGE_MESSAGES"],

  async	execute(client, message, cmd, args, Discord) {
    blackjack(
      { message: message,
        embed: {
        winMessage: '{user} ganó',
		    tieMessage: 'Es un empate',
		    loseMessage: '{user} perdió',
		    timeEndMessage: 'El tiempo se acabó, nadie ganó'
      }
    });
	}
}