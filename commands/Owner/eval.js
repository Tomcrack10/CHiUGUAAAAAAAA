const { MessageEmbed } = require("discord.js");
const OWNER_ID = "590606524682993751"
module.exports = {
  name: "eval",
  description: "Run a whole fuckin' code with this!",
  botPerms: ["EMBED_LINKS"],
  async execute (client, message, cmd, args, Discord) {
    //Eval Command(Not to be made public btw!)
    if (message.author.id != OWNER_ID) {
      return message.channel.send("Limited to the bot owner only!");
    }
    try {
      const code = args.join(" ");
      if (!code) {
        return message.channel.send("What do you want to evaluate?");
      }
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      let embed = new MessageEmbed()
        .setAuthor("Eval", message.author.avatarURL())
        .addField("Input", `\`\`\`${code}\`\`\``)
        .addField("Output", `\`\`\`${evaled}\`\`\``)
        .setColor("GREEN");

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  },
};
