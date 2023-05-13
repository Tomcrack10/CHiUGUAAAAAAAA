module.exports = {
	name: 'embed',
	description: "Crea un embed personalizado",
	usage: ".embed #canal",
	BotPerms:["MANAGE_MESSAGES"],

  async	execute(client, message, cmd, args, Discord) {
    const canal = message.mentions.channels.first() || message.channel
    let button = new Discord.MessageActionRow();
    button.addComponents(
      new Discord.MessageButton()
        .setCustomId(`CreateModal-${canal.id}`)
        .setStyle('PRIMARY')
        .setLabel('Crear Embed'),
    );
    await message.channel.send({
      content: "Da click en el boton para crear un Embed",
      components: [button]
    });
	}
}