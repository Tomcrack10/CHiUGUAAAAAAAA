
const { Client } = require("discord.js");
const { promisify } = require("util");
const glob = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { Perms } = require("../Validation/Permissions");
const { CommandInteraction, MessageEmbed } = require("discord.js")


/**
*@param {CommandInteraction} interaction
*@param {Client} client
*/
module.exports = async (client, interaction) => {
	const Table = new Ascii("Comando Cargado")

	CommandsArray = [];

	(await PG(`${process.cwd()}/SCommands/*/*.js`)).map(async (file) => {
		const command = require(file)//aqui, en esos paréntesis se pasan los argumentos a un require, asi como el client de este module.exports
//@GatoASXD a ok

		if(!command.name)
		return Table.addRow(file.split("/")[7], "❌Fallo", "Falta un nombre") 

		if(!command.context && !command.description)
		return Table.addRow(command.name, "❌Fallo", "Falta una descripcion")

		//*if(!command.permission) {
		//	if(Perms.includes(command.permission))		command.defaultPermission = false;
		//	else // no sirve... 
		//	return Table.addRow(command.name, "❌Fallo", "El permiso es invalido")
		//}

		client.SlashCommands.set(command.name, command);
		CommandsArray.push(command);

		await Table.addRow(command.name, "✅ Exitoso!");
		
	});

	console.log(Table.toString());

	// Checkear Permisos //

	client.on("ready", async () => {
		const guild = await client.guilds.cache.get("1006315983062974474");

		client.application.commands.set(CommandsArray)

		guild.commands.set(CommandsArray).then(async (SlashCommands) => {
			const Roles = (commandName) => {
				const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
				if(!cmdPerms) return null;
				exports.cmdPerms = cmdPerms//en qué parte accedes al archivo de los comandos? o sea para ejecutarlos
        //arriba
				return guild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
			}


			const fullPermissions = SlashCommands.reduce((accumulator, r) => {
				const roles = Roles(r.name);
				if(!roles) return accumulator;

				const permissions = roles.reduce((a, r) => {
				  return [...a, {id: r.id, type: "ROLE", permission: true}]
				}, [])

				return [...accumulator, {id: r.id, permissions}]
			}, [])

//guild.SlashCommands.permissions.set({ fullPermissions })

		});
	});

	client.on("interactionCreate", async (interaction) => {
			if(interaction.isCommand() || interaction.isContextMenu()) {
			const command = client.SlashCommands.get(interaction.commandName)
			if(!command) return interaction.reply({embeds: [
				new MessageEmbed()
				.setColor("RED")
				.setDescription("⛔ Un error a ocurrido mientras se ejecutaba este comando")
			]}) && client.SlashCommands.delete(interaction.commandName)
		                        //arriba
			
			command.execute(interaction, client)
			}
		
	})
}