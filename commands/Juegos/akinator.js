const akinator = require("discord.js-akinator")
module.exports = {
	name: 'akinator',
	aliases: ["aki"],
	description: "Juega akinator",
	usage: ".akinator",
	cooldown: 10,
	BotPerms:["MANAGE_MESSAGES"],

  async	execute(client, message, cmd, args, Discord) {
    if(!args[0] || args[0] == "character" || args[0] == "personaje" || args[0] == "1"){
      gameType = "character"
    }
    else if(args[0] == "animal" || args[0] == "2"){
      gameType = "animal"
    }
    else if(args[0] == "object" || args[0] == "objeto" || args[0] == "3"){
      gameType = "object"
    }
    else return message.reply("Debes especificar un tipo de juego válido:\nPersonaje: !aki (en blanco)/personaje/1\nAnimal: !aki animal/2\nObjeto: !aki objeto/3")
    akinator(message, {
            language: "es",
            childMode: true, 
            gameType: gameType, 
            useButtons: true
        });
	}
}