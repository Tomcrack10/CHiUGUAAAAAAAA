const SnakeGame = require('snakecord');
module.exports = {
	name: 'snake',
	aliases: ["snk"],
	description: "Juega Snake",
	usage: ".snake",
	cooldown: 5,
	BotPerms:["MANAGE_MESSAGES"],

  async	execute(client, message, cmd, args, Discord) {

		const snakeGame = new SnakeGame({
                 title: 'Snake Game',
                 color: 'GREEN',
                 timestamp: false,
               gameOverTitle: 'Game Over'
                });
	  await snakeGame.newGame(message);
	  }

}