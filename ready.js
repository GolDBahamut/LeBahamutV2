module.exports = 
{
    name:"ready",
    once: true,
    execute(async)
    {
        /*
    //Client.application.commands.create(data); affichera la commandes sur tout les serveurs ayant le bot (methode lente mais complete)
    client.guilds.cache.get("764244233972351057").commands.create(data);
 
    //recharger le cache du bot
    console.log( client.guilds.cache.get("764244233972351057").commands.cache);
    await client.guilds.cache.get("764244233972351057").commands.fetch();
    console.log( client.guilds.cache.get("764244233972351057").commands.cache);
    
    
    client.guilds.cache.get("764244233972351057").commands.create(stop);

    //permet de supprimer toutes les commandes du bot 
    client.guilds.cache.get("764244233972351057").commands.cache.map(command => 
        {
            command.delete;
        })*/

    // permet de supprimer une commandes du bot
    /*client.application.commands.guilds.cache.get("Identifiant de la commande").delete();

    //permet de supprimer des commandes du bot de Discord
    /*client.application.commands.cache.map(command => 
        {
            command.delete;
        })*/

    client.application.commands.create(clearCommand);


/*
    var row = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setCustomId("open-ticket")
            .setLabel("ouvrir un ticket")
            .setStyle("PRIMARY")        
        );

    client.channels.cache.get("1004709080444719105").send(
        {
            content : "Appuyez sur le bouton pour ouvrir un ticket", components: [row]
        });*/


    console.log("bot opérationnel");    }
}