const Discord = require("discord.js")
const intents = new Discord.Intents(32767)
const { Collection } = require("discord.js")
const client = new Discord.Client({ 
	intents, 
	partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
	allowedMentions: { parse: ["users", "everyone", "roles" ]},
})
require("dotenv").config()
const discordModals = require('discord-modals'); 
discordModals(client);
const ERROR_LOGS_CHANNEL = "1029081571501817959"
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table") 

module.exports = client

const fs = require('fs')
require("./Systems/GiveawaySys")(client);

client.SlashCommands = new Discord.Collection()
client.commands = new Discord.Collection()
client.events = new Discord.Collection();


//['Commands', 'Events'].forEach(async handler => {
//	await require(`./Structures/Handlers/${handler}`)(client, PG, Ascii)
//})

['common_handler', 'mongo_handler'].forEach(async handler => {
	await require(`./handlers/${handler}`)(client, Discord)
})

require('./Structures/Handlers/Commands')(client, PG, Ascii)
require('./Structures/Handlers/Events')(client, PG, Ascii)

//xd, eran errores en los require
//Tengo que remoledar esto
const token = process.env['token']
//ok
client.login(token)

const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('This site was created to keep bot on 25/8');
});
    server.listen(8000);

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);

  const exceptionembed = new Discord.MessageEmbed()
  .setTitle("Uncaught Exception")
  .setDescription(`${err}`)
  .setColor("RED")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [exceptionembed] })
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

   const rejectionembed = new Discord.MessageEmbed()
  .setTitle("Unhandled Promise Rejection")
  .addField("Promise", `${promise}`)
  .addField("Reason", `${reason.message}`)
  .setColor("RED")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [rejectionembed] })
});

setInterval(() => {
    if(!client || !client.user) {
    console.log("Floppa Utilities no se esta encendiendo... Utilizando Kill 1")
        process.kill(1);
    }
}, 15000);



//Messi