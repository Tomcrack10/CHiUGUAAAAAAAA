const backup = require("discord-backup")
backup.setStorageFolder(__dirname + "/backups/")

module.exports = {
	name: "backup",
	description: "Revisa, Crea o Carga un backup del servidor",
	aliases: ["bkp"],
	usage: ".backup create / infos / list / restore",
	UserPerms: ["ADMINISTRATOR"],
	BotPerms: ["ADMINISTRATOR"],
	cooldown: 5,

	async execute(client, message, cmd, args, Discord) {

		if(message.author.id !== message.guild.ownerId) return message.reply("Solo el dueño del servidor puede ejecutar este comando!")

		const actions = ["create", "load", "infos", "delete"]

		if(!actions.includes(args[0])) return message.reply("Solo puedes escojer las opciones `create` / `load` / `infos` / `delete`")


		if (args[0] === "create") {
			backup.create(message.guild, {

				jsonBeautify: true
				
			}).then(async backupdata => {

				const Embed = new Discord.MessageEmbed()
				.setColor("GREEN")
				.setTitle("Backup correctamente creado :white_check_mark:!")
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
				.setDescription(`El Backup ha sido correctamente creado! usa \`backup load ${backupdata.id}\` para cargar el backup o usa \`backup delete ${backupdata.id}\` Para borrar el backup`)
				.setFooter(`ID de tu backup ${backupdata.id}`)
				.setTimestamp()
				message.reply({ embeds: [Embed] })
			})
		}

		if(args[0] === "load") {

			const backupID = args[1]

			if(!backupID) return message.reply("Por favor da la ID del backup a cargar!")

			backup.fetch(backupID).then(async () => {
                                backup.load(backupID, message.guild).then(() => {
				clearGuildBeforeRestore: true,

				backup.remove(backupID)
			})
			}).catch(err => {

				message.reply("No hay ningun backup con esa id!")
			})
		}

		if(args[0] === "infos") {
			        let backupID = args[1];
                             if(!backupID){
                              return message.channel.send(":x: | Debes especificar una id de backup valida!");
                        }

                                     backup.fetch(backupID).then((backupInfos) => {
                                         const date = new Date(backupInfos.data.createdTimestamp);
                                         const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
                                         const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
                                         let embed = new Discord.MessageEmbed()
                                             .setAuthor("Informacion del Backup")

                                             .addField("Backup ID", backupInfos.id, false)

                                             .addField("ID del servidor", backupInfos.data.guildID, false)

                                             .addField("Tamaño", `${backupInfos.size} kb`, false)

                                             .addField("Creado El: ", formatedDate, false)
                                             .setColor("#FF0000");
                                         message.reply({ embeds: [embed] });
                                     }).catch((err) => {

                                        return message.channel.send(":x: | No se ah encontrado un backup con la id: `"+backupID+"`!");
                             });
		}

		if(args[0] === "delete") {

			const backup = args[1]

			if(!backup) return message.reply("Por favor da una id de un Backup")

			backup.remove(backup).then((backupInfos) => {

				message.reply("El backup ah sido correctamente borrado")
			}) .catch(err => {
				message.reply("No se encontro ningun backup con esa id!")
			})
		}
		
	}
}