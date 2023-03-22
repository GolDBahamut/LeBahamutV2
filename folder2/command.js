const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Permettra d'afficher le ping du bot (pas encore prêt)")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Mentionner un utilisateur")
        .setRequired(false))
    ;
const clearCommand = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Permet de supprimer des messages")
    .addIntegerOption(option =>
        option.setName("number")
        .setDescription("Nombre de Message a supprimer")
        .setRequired(true)
    );

const stop = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Permet d'arreter le bot");

const help = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Permet d'afficher les commande de base du bot")
    .addIntegerOption(option =>
        option.setName("string")
        .setDescription("Listes des commandes")
        .setRequired(true)
    );