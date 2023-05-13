const client = require("../index")

client.on('ready', async (client, Discord) => {
	console.log(`${client.user.tag} is now online!`)
	console.log(   `Nombre del bot: ${client.user.tag}` )
	console.log(`${client.guilds.cache.size} Servers`)
	const servers =	client.guilds.cache.size
	client.user.setPresence({ activities: [{ name: `Viendo ${servers} Servers`, type: `WATCHING` }] });  


})