
const Discord = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const Client = require('discord.js/src/client/Client');
const Canvas = require("canvas");
require("dotenv").config();
const { Guild, TextChannel } = require('discord.js');


const client = new Discord.Client(
    {
        intents : 
        [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_MEMBERS,
            Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS

        ]
    
    });

const finishim = "<@382666729324544000>";
const ownerBotID = "382666729324544000";
const orimeezie = "789960355593060422";
const guigui = "256482300324347904";
const fripou = "692985384958689281";


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


let prefix = "b.";


var nbTickets = 0 ;

process.on('unhandledRejection', function(e) {
    console.error(e);
  });

//Event ready
client.on("ready", async() => {

    var ServAccess = client.guilds.cache.get("764244233972351057")
    //Client.application.commands.create(data); affichera la commandes sur tout les serveurs ayant le bot (methode lente mais complete)
    ServAccess.commands.create(data);

    //recharger le cache du bot
    console.log( ServAccess.commands.cache);
    console.log(client.application.commands.cache);
    await ServAccess.commands.fetch();
    console.log( ServAccess.commands.cache);
    console.log(client.application.commands.cache);

    client.application.commands.create(stop);
    client.application.commands.create(help);
    client.application.commands.create(clearCommand);
    



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




//arreter le bot
client.on("interactionCreate", async interaction => 
{    

    if(interaction.isCommand())
    {
  
        //const authorizedUserIDs = [ownerBotID, orimeezie, fripou, guigui];

        if (interaction.commandName === "stop" )
        {
            
          if( interaction.user.id == ownerBotID || interaction.user.id == orimeezie || interaction.user.id == fripou || interaction.user.id == guigui)  
          //(authorizedUserIDs.includes(interaction.user.id)) 
          {
            interaction.reply("Mise hors tension ...");
            client.destroy();
            console.log("la commande à été utilise par " + `${interaction.user.username}` + " dans "+ `${interaction.guild.name}`)
            console.log("bot éteint")

          }
        }

        /*if(interaction.commandName === "stop")
        {

            //const goodbyeMessage = "Je vais maintenant m'éteindre. Au revoir !";


            if(interaction.user.id === ownerBotID || interaction.user.id === orimeezie || interaction.user.id === fripou)
            {
                interaction.reply("Mise hors tension ...");
                client.destroy();
                console.log("la commande à été utilise par " + interaction.user.id + " dans "+ interaction.guild.id)
            }
            /*else
            {
                interaction.reply({content : "Vous n'avez pas les droit pour executer cette commande", ephemeral:true});
            }
        }*/
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
                            name: prefix + 'Ping',
                            value: "Permettra d'afficher le ping du bot (pas encore prêt)",
                            inline: true,
                        },                
                        {
                            name: prefix + 'help',
                            value: 'Affiche la liste des commandes',
                            inline: true,
                        },
                        {
                            name: prefix + 'Menu',
                            value: "Permet d'afficher le Menu de selection de Role",
                            inline: true,
                        },                
                        {
                            name: prefix + 'bouton',
                            value: "Permet d'afficher un message a bouton (pas de reaction particulier) *IN PROGRESS*",
                            inline: true,
                        },                               
                        {
                            name: prefix + 'spells',
                            value: "Permet d'utilser des sort de Bahamut",
                            inline: true,
                        },      
                        {
                            name: prefix + 'color',
                            value: "Permet de changer de couleur *IN PROGRESS*",
                            inline: true,
                        }, 
                        
        
                        {
                            name: prefix + 'urgence',
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
                /*const attachment = new Discord.MessageAttachment("./ainzstm.gif");

                interaction.followUp({files : [attachment]})
                console.log("clear de "+number + " messages");*/
                
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
    /*if(interaction.isButton())
    {
        if(interaction.customId = "bouton1")
        {//la reaction au bouton commence ici
            interaction.reply("Vous avez appuyez sur le bouton avec succes")
            interaction.
        }
    }*/
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
client.login(process.env.BOT_TOKEN);



client.on("messageCreate",async message => 
{
    /*const b = "prefix + ";
    const prefixCheck = message.content.toLowerCase().startsWith(prefix + toLowerCase());
    const prefix = prefixCheck ? b : undefined;*/
    
    if (message.author.bot)return;//permet de detecter que l'auteur du message 
    if (antispam)return;
    const twitter = ["twitter.com"];
    const ebuism = message.guild.id === "1032592240306036736";
    const miraculous = message.guild.id === "868092294329401384";
    const creationDate = message.guild.createdAt.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    if (ebuism) 
    {
        var ownerName = ["chieb","shieb","chiem"]

        if (ownerName.some(word => message.toString().toLowerCase().includes(word)) ) 
        {
            message.reply(sayMyName); 
        }
        if (twitter.some(word => message.toString().toLowerCase().includes(word))) 
        {
    
            message.delete().catch(e => 
                console.error("Couldn't delete message.")); 
                console.log(message.author.id)
                console.log(message)
        }
        if (message.content == prefix + "helpM") 
        {
            const embed2 = new Discord.MessageEmbed()
            .setColor("#d60000")
            .setTitle("Liste des commandes")
            .setURL("https://discord.js.org/")
            .setAuthor("Auteur du bot","https://i.imgur.com/AfFp7pu.png","https://discord.js.org/")
            .setDescription("*Contient la listes des commandes*")
            //.setThumbnail("https://i.imgur.com/AfFp7pu.png")
            .addFields(
                [
                    {
                        name: prefix + 'helpM',
                        value: 'Affichera les commandes specifiques du channel E-busiM',
                        inline: true,
                    },
                    {
                        name: prefix + 'aide',
                        value: 'permet d\'appeler '+finishim+' en cas de besoin (au long termes pouvoir repondre aux petites questions)',
                        inline: true,
                    },
                ])
            .setTimestamp()
            .setFooter("Finishim.G.D.B is the owner of this bot");
            message.channel.send({ embeds :[embed2]});
        }
        
        if (message.content == "aide") 
        {
            message.channel.send("Veuillez patienter avant que " + finishim +" se connecte")
        }

        if (message.content == "aideProgra") 
        {
            message.channel.send("Veuillez patienter avant que Finishim se connecte")
        }
        
    } 
    
    else 
    if(miraculous)    
    {
        const liens = ["http://","https://","www."];
        const orimeezie = "789960355593060422";
        const estmorzel = "789542700013453384"
        const asriux = "388990947058253824"



        if (liens.some(word => message.toString().toLowerCase().includes(word))&& !message.member.permissions.has('EMBED_LINKS')) 
        {
    
            message.delete().catch(e => 
                console.error("Couldn't delete message.")); 
                console.log(message.author.id)
                //console.log("l'utilisateur "+ message.author.username +" dispose des droit pour realiser cette operation " + message.guild.name)
                message.channel.send("<@"+message.author.id+`>\nVous n'avez pas le niveau nécessaire pour effectuer ceci \nYou do not have the required level to do this`)

        }


    

    }
    if(message.content == prefix + "modo")
    {
        if (message.member.permissions.has("ADMINISTARTOR")||message.author.id == ownerBotID) 
        {

            //message.channel.send("this command normally works");

            const embed2 = new Discord.MessageEmbed()
            .setColor("#d60000")
            .setTitle("Liste des commandes")
            .setURL("https://discord.js.org/")
            .setAuthor("Auteur du bot","https://i.imgur.com/AfFp7pu.png","https://discord.js.org/")
            .setDescription("*Contient la liste des commandes pour les modérateurs de Miraculorime - Orimeezie*")
            //.setThumbnail("https://i.imgur.com/AfFp7pu.png")
            .addFields(
                [
                    {
                        name: prefix + 'help',
                        value: 'Affichera les commandes de base',
                        inline: true,
                    },               
                    {
                        name: prefix + 'kick',
                        value: "Permet d'expulser un membre",
                        inline: true,
                    }, 
                    {
                        name: prefix + 'ban @NomDuMembre raison',
                        value: "Permet de bannir un membre",
                        inline: false,
                    }, 
                    {
                        name: prefix + 'mute',
                        value: "Permet de muter un membre en lui attribuant le role <@&1038868619280523335>",
                        inline: false,
                    }, 
                    {
                        name: prefix + 'unmute',
                        value: "Permet de retablir la voix d'un membre en lui retirant le role <@&1038868619280523335>",
                        inline: false,
                    }, 
                    {
                        name: prefix + 'lock',
                        value: "Permet d'empecher les membres d'ecrire sur le channel",
                        inline: false,
                    }, 
                    {
                        name: prefix + 'unlock',
                        value: "Permet de retablir la permissions d'ecriture des membres sur le channel",
                        inline: false,
                    }, 
                ])
            .setTimestamp()
            .setFooter("Finishim.G.D.B is the owner of this bot");
            message.channel.send({ embeds :[embed2]});
        }
        else
        {
            message.channel.send("this is not for you");
        }

    }

    /*const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'logs') {
    // Récupérer les entrées du journal d'audit
    client.guilds.cache.get(message.guild.id).fetchAuditLogs()
        .then(auditLogs => {

        console.log(auditLogs.entries);
        //message.channel.send(console.log(auditLogs.entries))
        })
        .catch(console.error);
    } */

    ////
    //const channelBase = client.guilds.cache.get("guildID").channels.cache.get("channelID");

    if(message.member.permissions.has('MANAGE_CHANNELS'))
    {
        if (message.content === prefix +'lock') 
        {
    
    
            message.channel.send("Channel locked, please wait until the staff is done ...");
            //console.log("le channel "+ message.channel.get.name +"a ete locked")
            message.channel.permissionOverwrites.edit(message.guild.id, {
                SEND_MESSAGES: false
              });
    
    
        }
        if (message.content === prefix +'unlock') 
        {
    
    
            message.channel.send("Channel unlocked, thanks for your patience.");
    
            message.channel.permissionOverwrites.edit(message.guild.id, {
                SEND_MESSAGES: true
              });
    
        }
    }    

    if(message.content ==  prefix + "cereale")
    {
        message.channel.send("Trésors <<< LION <<< GG <<< Chocapic <<< Miel Pops <<< Cookie Crisp");
    }

    if(message.content.startsWith("changePrefix"))
    {
        let newPrefix = message.content.slice(13);
        prefix = newPrefix;
        //console.log(newPrefix);
        message.reply("le préfixe à été changé pour  : "+ prefix);
    }

    if(message.content == "prefix?")
    {
        message.reply("le préfixe actuelle est : "+ prefix)
    }

    /*if(message.content ==  prefix + "cereale2")
    {
        const channel = client.channels.fetch("866596935745667092");
        const message = channel.fetch("1054804886312726539");
        message.send();
    }*/
    
    if(message.content ==  prefix + "chocapic")
    {
        message.channel.send("Céréale préféré de Zelie");
    }

    if(message.member.permissions.has('BAN_MEMBERS')&&message.member.permissions.has("KICK_MEMBERS"))//verifie les permissions et non pas les roles
    {

        if(message.content.startsWith(prefix + "ban")) {
          let mention = message.mentions.members.first();
          if(mention == undefined) {
            message.reply("Le membre à été non ou mal-mentionné");
          } 
          /*else
            if(mention == undefined && mention == botid)
            {
                message.channel.send("Mais t'es un ouf toi tu crois que je vais me auto-ban !")
            }*/
            else {
            let reason = message.content.split(" ").slice(2).join(" "); // récupère la raison de banissement
            if(mention.bannable) {
              mention.ban({ reason: reason }); // passe la raison de banissement en tant qu'option
              message.channel.send(mention.displayName + " à été banni pour la raison suivante : " + reason);
              console.log(message.author.username + " a banni "+ mention.displayName + " pour la raison suivante : " + reason)
            } else {
              message.reply("Impossible de bannir ce membre");
            }

          }
        }
        else if(message.content.startsWith(prefix + "kick"))
        {
            let mention = message.mentions.members.first();
            if(mention == undefined)
            {
                message.reply("Le membre à été non ou mal-mentionné");
            }
            else
            {
                if(mention.kickable)
                {
                    mention.kick();
                    message.channel.send(mention.displayName + " à été expulsé")
                    console.log(message.author.username + " a expulsé "+ mention.displayName )
                }
                else
                {
                    message.reply("Impossible d'expulsé ce membre")
                }
            }
        }

    }
    
    if (message.member.permissions.has('MUTE_MEMBERS'))
    {
        if(message.content.startsWith(prefix + "mute"))
        {
            let mention = message.mentions.members.first();
            if(mention == undefined)
            {
                message.reply("Le membre à été non ou mal-mentionné");
            }
            else
            {
                mention.roles.add("1038868619280523335")
                message.reply(mention.displayName + " Muté avec succès")
            }
        }
        else
        if(message.content.startsWith(prefix + "unmute"))
        {
            let mention = message.mentions.members.first();
            if(mention == undefined)
            {
                message.reply("Le membre à été non ou mal-mentionné");
            }
            else
            {
                mention.roles.remove("1038868619280523335")
                message.reply(mention.displayName + " Démuté avec succès")
            }
        }

    }
     

        if (message.content.startsWith(prefix+'eval') )
        {
            
            const code = message.content.slice(7);
            
            let col = "#00FF00";
            let nm = "Resultat";
            let value;
    
    
            try {
              const result = eval(code);
               col = "#00FF00";
               nm = "Resultat";
               value = `${result}`;
            } catch (error) {
               col = "#d60000";
               nm = "Erreur";
               value = error.message;
            }
          
            const embed = new Discord.MessageEmbed()
              .setColor(col)
              .setTitle(code)
              .addFields([
                {
                  name: nm,
                  value: value,
                  inline: true
                }
              ])
              .setTimestamp()
              .setFooter("Finishim.G.D.B is the owner of this bot");
            message.channel.send({ embeds: [embed] });
        }
    




        /*if (message.content.startsWith(prefix + 'eval') && message.author.id == ownerBotID) 
        {
            // Récupérez le code à évaluer à partir du message
            const code = message.content.slice(7);
            // Utilisez la fonction eval() pour exécuter le code
            try {
            const result = eval(code);
            message.channel.send(`Résultat : ` + `${result}`);

            } catch (error) {
            message.channel.send(`Erreur : ` + `${error.message}`);

            }
        }*/



      /*selse if(message.content.startsWith(prefix + 'eval') && message.author.id != ownerBotID)
      {
        message.channel.send("Vous n'avez pas les droits")
      }*/

      
      if (message.content.startsWith(prefix + 'pref')) {
        const options = message.content.split(' ').slice(1);
        // Vérifie qu'il y a bien deux options
        /*if (options.length !== 2) {
          return message.channel.send('La question doit être de la forme "command + X or Y ?"');
        }*/
      
        // Récupère la première option en utilisant slice()
        const option1 = options.slice(0, options.indexOf('ou')).join(' ');
        // Récupère la seconde option en utilisant slice()
        const option2 = options.slice(options.indexOf('ou') + 1).join(' ');
      
        // Génère un nombre aléatoire entre 0 et 1
        const randomNumber = Math.random();
      
        // Si le nombre est inférieur à 0,5, envoie la première option
        if (randomNumber < 0.5) {
          message.channel.send(`Je choisi ${option1}.`);
        }
        // Sinon, envoie la seconde option
        else {
          message.channel.send(`Je choisi ${option2}.`);
        }
      }

      if (message.content.startsWith(prefix + '?')) {
        // Récupère les deux options de la question
        const option = message.content.slice(2);
      
        // Génère un nombre aléatoire entre 0 et 1
        const randomNumber = Math.random();
      
        // Si le nombre est inférieur à 0,5, envoie la première option
        if (randomNumber < 0.5) {
          message.channel.send(`Oui`);
        }
        // Sinon, envoie la seconde option
        else {
          message.channel.send(`Non`);
        }
      }
      
 



    var serverIcon = message.guild.iconURL();
    if(message.content == prefix + "servInfo")
    {
        //const guild = message.guild;


    message.guild.members.fetch().then(() => {
        
        const embed3 = new Discord.MessageEmbed()
            .setColor("#d60000")
            .setTitle(`**${message.guild.name}**`)
            .setURL("https://discord.js.org/")
            .setDescription("*Contient des infos sur le serveur*")
            .setThumbnail(serverIcon)
            .addFields(
                [
                    

                    {
                        name: "■ ID du serveur: ",
                        value: `${message.guild.id}`,
                        inline: true,
                    },
                                        {
                        name: "■ Crée le: ",
                        value: `${creationDate}`,
                        inline: true,
                    },
                                        {
                        name: "■ Nombre de membres: ",
                        value: ""+ `${message.guild.members.cache.size}`,
                        inline: false,
                    },
                    {
                        name: "■ Owner: ",
                        value: "<@"+ message.guild.ownerId + ">",
                        inline: true,
                    },                       
                    {
                        name: "■ Owner ID: ",
                        value: ""+ message.guild.ownerId,
                        inline: true,
                    }
                    ,                       

                    {
                        name: "■ Roles: ",
                        value: `${message.guild.roles.cache.size}`,
                        inline: false,
                    },
                    {
                        name: "■ Salon textuels: ",
                        value: `${message.guild.channels.cache.filter(ch => ch.type === "GUILD_TEXT").size}`,
                        inline: true,
                    },
                    {
                        name: "■ Salon vocaux: ",
                        value: `${message.guild.channels.cache.filter(ch => ch.type === "GUILD_VOICE").size}`,
                        inline: true,
                    },

                ])
            .setTimestamp()
            .setFooter("Finishim.G.D.B is the owner of this bot");
            message.channel.send({ embeds :[embed3]});
    });
            /*message.channel.send(`Votre serveur possede ${message.guild.channels.cache.filter(ch => ch.type === "GUILD_TEXT").size} salons textuels
            et ${message.guild.channels.cache.filter(ch => ch.type === "GUILD_VOICE").size} salons vocaux`)*/
    }

    var antispam = message.author.id = "813461736963309628"
    var hello = ["hello","salut","bonjour","bienvenue"];
    var spells = ["Mega-Fission","Giga-Fission","Fission","Brasier","Giga-Atomium"];
    var sayMyName = ["C'est Chiheb btw ..."]
    var greetings = ["Hello !","Bonjour !","Bienvenue !","Bien le bonjour !"];

    var miam = ["miam","yae miko"]
    var nuit = ["bonsoir le bot"];
    var modo = ["peut etre modo","peut être modo","peut etre moderateur","peut être moderateur","peut etre modérateur","peut être modérateur"];
    var news = ["ca va le bot","quoi de neuf le bot","ça va le bot"];
    var testing = ["test"];
    var sora = ["sora"];
    var GN = ["bonne nuit"];
    var nomnom = ["miam miam","nom nom","trop bon"];
    var kaguyasan = ["comme c'est mignon","o kawai koto","o kawaii koto"];
    var musicLink = [];
    //var questMarks = ["8ball."];
    var linkAho = ["linkilémoche","linkilemoche"];
    var botid2 = ["<@983789282919612416>"]
    var ganyu = ["ganyu"]
    var ayaya = ["ayaya"]




    




    var botid = "<@983789282919612416>"



    /*if (message.content == prefix + "music" + musicLink   || message.content == prefixmaj + "music" + musicLink   ) {
        // Vérifiez si l'utilisateur a rejoint un canal vocal
        if (!message.member.voice.channel) {
          return message.channel.send(`Vous devez être connecté à un canal vocal pour jouer de la musique.`);
        }
      
        // Vérifiez si le bot a l'autorisation de rejoindre le canal vocal de l'utilisateur
        if (!message.member.voice.channel.joinable) {
          return message.channel.send(`Je n'ai pas la permission de rejoindre votre canal vocal.`);
        }
      
        // Rejoignez le canal vocal de l'utilisateur
        const connection = await message.member.voice.channel.join();
      
        // Créez un lecteur de musique en utilisant la bibliothèque de votre choix (par exemple, ffmpeg ou ytdl-core)
        const dispatcher = connection.play('./music/' + musicLink);
      
        // Envoyez un message confirmant que la musique a été lancée
        message.channel.send(`Lecture de la chanson ${musicLink}`);
      }*/


    if (hello.some(word => message.toString().toLowerCase().includes(word)) ) 
    {

        let randomMessage = Math.floor(Math.random() * (greetings.length))
        message.reply(greetings[randomMessage])
        console.log(randomMessage)

    }


    if (message.content == prefix + "spells" ) 
    {

        let randomMessage = Math.floor(Math.random() * (spells.length))
        message.reply("Bahamut a utilisé " + spells[randomMessage])
        console.log(randomMessage)

    }

    if (nuit.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.channel.send("Bonsoir !"); 

    }
    if (GN.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.channel.send("Bonne nuit a toi aussi !"); 

    }

    if (testing.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.react('<:soraJudge:907721258827939890>');
    }
    if (sora.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.reply('<:soraJudge:907721258827939890>');
    }


    if (kaguyasan.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.react('<:kaguya:1007056590551138474>');
    }


    if (nomnom.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.react('<:yumemiko:1007010900030541866>');
    }

    if (linkAho.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.reply('<:kimoLink:1030203588527538297> ');
    }

    if (miam.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.reply('<:yumemiko:1007010900030541866>');
    }

    if (ayaya.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.reply('<:ayaya:1078290756156002366>');
    }


    if (news.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.reply("Je vais bien et toi ? \n(Juste pour dire mon créateur est toujours fatigué )"); 

    }

    if (modo.some(word => message.toString().toLowerCase().includes(word)) ) 
    {
        message.reply("Tu n'as pas à demander cela !"); 

    }
    
    if (message.content === prefix + "ping"   )
    {
        const ping = Math.abs(Date.now()-message.createdTimestamp.toFixed(2))
        message.reply(`Ping reçu\nMon temps de réaction est de **${ping}ms**.`)

    }
    if (message.content === prefix + "urgence" && antispam )
    {
        message.channel.send(finishim+finishim+finishim+finishim+finishim+finishim+finishim+finishim+finishim);
        console.log("une urgence à été sonée dans " + `${message.guild.name}` + "!!")
    }
    

    /*if (message.content === prefix + "doubt") {
        message.channel.send("<1052990384642478091>")
    }*/
    if (message.content === prefix + "masterClass"  )
    {
        message.reply("musique recommandé par " + finishim + "https://www.youtube.com/watch?v=p2wIPUQu4JQ")
    }
    /*if (message.content === botid   )
    {
        //message.channel.send("musique recommende par " + finishim)
        message.reply("Que puis-je pour vous ?")
    }*/

    if (botid2.some(word => message.toString().includes(word)) ) 
    {
        message.reply("Que puis-je pour vous ?")

    }
    


    /*if(message.channel.type == "DM" && botid2.some(word => message.toString().includes(word)) )
    {
        message.reply("Que puis-je pour vous ?")
    };*/


    if(message.content === prefix + "help" || message.content == "I need your help Bahamut !")
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
                    name: prefix + 'Ping',
                    value: "Permettra d'afficher le ping du bot (pas encore prêt)",
                    inline: true,
                },                
                {
                    name: prefix + 'help',
                    value: 'Affiche la liste des commandes',
                    inline: true,
                },
                {
                    name: prefix + 'Menu',
                    value: "Permet d'afficher le Menu de selection de Role",
                    inline: true,
                },                
                {
                    name: prefix + 'bouton',
                    value: "Permet d'afficher un message a bouton (pas de reaction particulier) *IN PROGRESS*",
                    inline: true,
                },                               
                {
                    name: prefix + 'spells',
                    value: "Permet d'utilser des sort de Bahamut",
                    inline: true,
                },      
                {
                    name: prefix + 'color',
                    value: "Permet de changer de couleur *IN PROGRESS*",
                    inline: true,
                }, 
                
                


                {
                    name: prefix + 'urgence',
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

        message.channel.send({ embeds :[embed]});
    }
    if(message.content === prefix + "bouton")
    {
        //if (antispam)return;
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("bouton1")
                .setLabel("Appuyez")
                .setStyle("DANGER")
                .setEmoji("😉")
            ).addComponents(new Discord.MessageButton()
                .setLabel("doc discord.js")
                .setStyle("LINK")
                .setEmoji("💻")
                .setURL("https://discord.js.org/")
            
            );
        
        message.channel.send(
            {
                content:"message avec bouton", components:[row]
            });
    }       
    if(message.content === prefix + "Menu")
    {
    var row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Selectionnez une option")
                .addOptions
                ([
                    {
                        label: "Ajouter role",
                        description: "1ere description",
                        value: "option1"
                    },
                    {
                        label: "Retirer role",
                        description: "2nd description",
                        value: "option2"
                    }
                ])
        );

        message.channel.send(
            {
                content:"Menu de selection de Role", components:[row]
            });

    }
    
    const ratio = ["ratio"]
    const leon = ["leon"]
    const leonBG = ["leon bg"]
    const mario = ["it’s me mario"]


    if (leon.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.react('<:leon:1005520037332914177>');
    }

    if (leonBG.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply('<:leon:1005520037332914177>');

    }
    
    if (mario.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply("Yay! Luigi time!");
    }

    if (message.content == "ratio" || message.content == "Ratio" && message.author.id === ownerBotID && message.guild.id != "866387537484578816")
    {

        const attachment = new Discord.MessageAttachment("./getRatio.gif");

        message.channel.send({files : [attachment]})
        console.log("image envoyé.");

    }

    if (leon.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.react('<:leon:1005520037332914177>');

    }
    const jojo = ["jojo","dio"]

    if (jojo.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply('Is this a JoJo reference ?')
        message.react('<:DIO:1006493436154748958>');

    }

    const tristesse = ["sad","triste","pleurer"]
    const careful = ["vraiment triste"]
    const warns = ["calmer mon bot"]


    if (careful.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply("Ohh Pardon 😔")

    }
    else 
    if (tristesse.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply("T'es triste ? Arrête")
        message.react('<:yuliacry:1005511957685743717>');
    }

    if (warns.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply("Ohh Pardon 😔 j'ai ete coder avec le c*")

    }
    
    /*

    const BannedWords = [
        "salaud","connard","merde"
    ]*/
    
    /*

        if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) 
        {
            message.delete().catch(e => 
                console.error("Couldn't delete message.")); 
                message.reply(`Pas de mot pareil en ces lieux !`)
        };
   */
    


});



/////////////////////////////////////////////////

//Gestion des arrivee et depart d'un membre

client.on("guildMemberAdd", async member => 
{
    console.log("un membre est arrivé.");
    client.channels.cache.get("764244233972351060").send("<@" + member.id +"> est arrivé");
    member.roles.add("1003241072484429844")

    var canvas = Canvas.createCanvas(840 , 400);

    ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./redBackground.png");
    ctx.drawImage(background, 0,0,840 , 400);

    ctx.font = "900 37px OCR A Extended";
    ctx.fillStyle = "#ff4800";
    ctx.textAlign = "center";
    ctx.fillText("Bienvenue à toi " + member.user.tag.toUpperCase(), 420, 310)
      
    var avatarProfile = await Canvas .loadImage(member.user.displayAvatarURL({
        format: "png",
        size : 1024
    }));

    ctx.beginPath();
    ctx.arc(410,140,100,0,Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    

    ctx.drawImage(avatarProfile, 305, 35, 208, 208);

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(),"welcome.png");

    client.channels.cache.get("764244233972351060").send({files:[attachment]});
});

client.on("guildMemberRemove", async member => 
{
    console.log("un membre est parti.");
    client.channels.cache.get("764244233972351060").send("<@" + member.id +"> est parti");

    
    var canvas = Canvas.createCanvas(840 , 400);

    ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./redBackground.png");
    ctx.drawImage(background, 0,0,840 , 400);

    ctx.font = "900 37px OCR A Extended";
    ctx.fillStyle = "#ff4800";
    ctx.textAlign = "center";
    ctx.fillText("A bientôt " + member.user.tag.toUpperCase(), 420, 310)
      
    var avatarProfile = await Canvas .loadImage(member.user.displayAvatarURL({
        format: "png",
        size : 1024
    }));

    ctx.beginPath();
    ctx.arc(410,140,100,0,Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    

    ctx.drawImage(avatarProfile, 305, 35, 208, 208);

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(),"welcome.png");

    client.channels.cache.get("764244233972351060").send({files:[attachment]});
});
