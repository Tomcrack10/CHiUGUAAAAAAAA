const Discord = module.require("discord.js");

module.exports = {
  name: "8ball",
  description: "Tells you a fortune",
  options: [
      {
          name: "question",
          description: "The question you want to ask the magic 8ball",
          type: 'STRING',
      }
  ],
  async execute(interaction) {

    
    var fortunes = [
       "Sí.",
       "Es cierto.",
       "Es decididamente así.",
       "Sin duda.",
       "Sí, definitivamente.",
       "Puedes confiar en ello.",
       "Como yo lo veo, sí.",
       "Más probable.",
       "Perspectivas buena.",
       "Las señales apuntan a que sí.",
       "Respuesta confusa, intenta otra vez.",
       "Pregunta de nuevo más tarde.",
       "Mejor no decirte ahora...",
       "No se puede predecir ahora.",
       "Concéntrate y pregunta otra vez.",
       "No cuentes con eso.",
       "Mi respuesta es no.",
       "Mis fuentes dicen que no.",
       "Las perspectivas no son tan buenas...",
       "Muy dudoso.",
    ];
    await interaction.reply(
      fortunes[Math.floor(Math.random() * fortunes.length)]
    );
  },
};