client.on("ready", async() => {

    var ServAccess = client.guilds.cache.get("764244233972351057")
    //Client.application.commands.create(data); affichera la commandes sur tout les serveurs ayant le bot (methode lente mais complete)
    ServAccess.commands.create(data);
    client.application.commands.create(stop);
    client.application.commands.create(help);
    client.application.commands.create(clearCommand);
    //recharger le cache du bot
    console.log( ServAccess.commands.cache);
    console.log(client.application.commands.cache);
    await ServAccess.commands.fetch();
    console.log( ServAccess.commands.cache);
    console.log(client.application.commands.cache);

    
    



    //permet de supprimer toutes les commandes du bot 
    /*ServAccess.commands.cache.map(command => 
        {
            command.delete();
        })

        console.log( ServAccess.commands.cache);


    // permet de supprimer une commandes du bot
   //client.application.commands.guilds.cache.get("1005616708150640770").delete();

    //permet de supprimer des commandes du bot de Discord
    /*client.application.commands.cache.map(command => 
        {
            command.delete;
        })*/

    //client.application.commands.set([])
    


    /*
    client.channels.cache.get("1004709080444719105").send(
        {
            content : "Appuyez sur le bouton pour ouvrir un ticket", components: [row]
        });*/

    console.log("bot opérationnel");
});

    client.on("interactionCreate", async interaction => 
    {    

        if(interaction.isCommand())
        {
    
            if(interaction.commandName === "stop")
            {
                const orimeezie = "789960355593060422";
                const guigui = "256482300324347904";
                const fripou = "692985384958689281";
                const goodbyeMessage = "Je vais maintenant m'éteindre. Au revoir !";


                if(interaction.user.id === ownerBotID || interaction.user.id === orimeezie || interaction.user.id === fripou)
                {
                    interaction.reply("Mise hors tension ...");
                    client.destroy();
                    console.log("la commande a ete utilise par " + interaction.user.id + " dans "+ interaction.guild.id)
                }
                else
                {
                    interaction.reply({content : "Vous n'avez pas les droit pour executer cette commande", ephemeral:true});
                }
            }
            if(interaction.commandName === "help")
            {
                
                if(interaction.options.getNumber("1"))
                {
                    const embed = new Discord.MessageEmbed()
                    .setColor("#d60000")
                    .setTitle("Liste des commandes")
                    .setURL("https://discord.js.org/")
                    .setAuthor("Auteur du bot","https://i.imgur.com/AfFp7pu.png","https://discord.js.org/")
                    .setDescription("*Contient la liste des commandes*")
                    //.setThumbnail("https://i.imgur.com/AfFp7pu.png")
                    .addFields(
                        [
                            {
                                name: 'hello',
                                value: 'Le bot repondra Hello en retour',
                                inline: true,
                            },
                            {
                                name: 'b.Ping',
                                value: "Permettra d'afficher le ping du bot (pas encore prêt)",
                                inline: true,
                            },                
                            {
                                name: 'b.help',
                                value: 'Affiche la liste des commandes',
                                inline: true,
                            },
                            {
                                name: 'b.Menu',
                                value: "Permet d'afficher le Menu de selection de Role",
                                inline: true,
                            },                
                            {
                                name: 'b.bouton',
                                value: "Permet d'afficher un message a bouton (pas de reaction particulier) *IN PROGRESS*",
                                inline: true,
                            },                               
                            {
                                name: 'b.spells',
                                value: "Permet d'utilser des sort de Bahamut",
                                inline: true,
                            },      
                            {
                                name: 'b.color',
                                value: "Permet de changer de couleur *IN PROGRESS*",
                                inline: true,
                            }, 
                            
                            
            
            
                            {
                                name: 'b.urgence',
                                value: "Pour me Hard-ping en cas de problème",
                                inline: false,
                            },          
            
            
            
            
                            //slash commandes
                            {
                                name: '/clear + nombre',
                                value: "permet de clear un nombre defini de message dans un channel",
                                inline: false,
                            },                
                            {
                                name: '/stop',
                                value: "permet d'arreter le bot (commande reserve a des personnes de confiance)",
                                inline: false,
                            },
            
                        ])
        
                    .setTimestamp()
                    .setFooter("Finishim.G.D.B is the owner of this bot")
                    ;
            
                    interaction.reply({ embeds :[embed]});
                }

            

            }
            
        }

        //gestion de tickets

        if(interaction.isButton())
        {
            if(interaction.customId === "open-ticket")
            {
                nbTickets ++;

                interaction.guild.channels.create("ticket-" + nbTickets , 
                {
                    parent : "1004708918678786128"
                }).then(channel =>
                    {
                        var row = new Discord.MessageActionRow()
                        .addComponents(new Discord.MessageButton()
                            .setCustomId("close-ticket")
                            .setLabel("fermer un ticket")
                            .setStyle("DANGER")        
                        );
                    

                        channel.send
                        ({
                            content: "<@"+interaction.user.id+"> Voici votre ticket , vous pouvez le fermer en appuyant sur le bouton ci-dessous" , components : [row]
                        })
                    })
            /*interaction.reply(
                {
                    content: "Ticket créé avec succès" , ephemeral : true
                });*/
            }
            else if(interaction.customId === "close-ticket")
            {
                interaction.channel.setParent("1004709246866313226")

                var row = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("delete-ticket")
                    .setLabel("supprimer un ticket")
                    .setStyle("DANGER")        
                );

                interaction.message.delete();

                interaction.channel.send(
                    {
                        content : "Supprimer le ticket", components: [row]
                    });
                
                /*interaction.reply(
                    {
                        content: "Ticket archivé avec succès" , ephemeral : true
                    });       */ 
            }

            else if(interaction.customId === "delete-ticket")
            {
                interaction.channel.delete();

                /*interaction.reply(
                    {
                        content : "Ticket supprimé avec succès", ephemeral: true
                    }); */       
            }
        }

        //Gere les slash commandes

        if(interaction.isCommand())
        {
            if(interaction.commandName === "ping")
            {
                let user = interaction.options.getUser("utilisateur");

                if(user == undefined)
                {
                    interaction.reply("Ping reçu");
                }
                else
                {
                    interaction.reply("<@" + user.id +"> Vous avez été ping")
                }
            }
            if(interaction.member.permissions.has("ADMINISTRATOR"))
            {
                if(interaction.commandName === "clear")
                {
                    var number = interaction.options.getInteger("number")

                    if(number >=1 && number <= 100)
                    {
                    interaction.channel.bulkDelete(number);
                    interaction.reply(
                        {
                            content: number + " messages correctement supprimés" , ephemeral:true
                            
                        })
                    const attachment = new Discord.MessageAttachment("./ainzstm.gif");

                    interaction.followUp({files : [attachment]})
                    console.log("clear de "+number + " messages");
                    
                    }
                    else
                    {
                        interaction.reply(
                            {
                                content:"Le nombre de messages à supprimés doit etre compris entre 1 et 100" , ephemeral:true
                            }
                        )
                    }
                }
            }
            
            if(interaction.commandName === "leon")
            {
                const message = await interaction.reply(
                { 
                    content: 'You can react with custom emojis!', fetchReply: true 
                });
                message.react('<:leon:1005520037332914177>');
            }
            
        }

        //Bouton
        if(interaction.isButton())
        {
            if(interaction.customId = "bouton1")
            {//la reaction au bouton commence ici
                interaction.reply("Vous avez appuyez sur le bouton avec succes")
            }
        }
        //Menu

        if(interaction.isSelectMenu())
        {
            if(interaction.customId === "select")
            {
                console.log(interaction.values);

                if(interaction.values == "option1")
                {
                    interaction.reply
                    ({
                        content: "Vous avez ajouter le role" , ephemeral:true
                    })
                    interaction.member.roles.add("1004072125541400716")

                }
                if(interaction.values[0] == "option2")
                {
                    interaction.reply
                    ({
                        content: "Vous avez retirer le role" , ephemeral:true
                    })

                    interaction.member.roles.remove("1004072125541400716")


                }
            }
        }

    })
  
  client.on("messageCreate", async message => {
    // votre code ici
  });
  
  client.on("guildMemberAdd", async member => {
    // votre code ici
  });
  
  client.on("guildMemberRemove", async member => {
    // votre code ici
  });
  
  client.on("guildMemberUpdate", async (oldMember, newMember) => {
    // votre code ici
  });