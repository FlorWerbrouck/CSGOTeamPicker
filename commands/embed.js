module.exports = {
    name: 'embed',
    discription: "this is an embed",
    async execute(message, args, Discord, client){
        
        var max = 5;
        var players = [];
        var spelers = "";
        for (let player of players){
            spelers = spelers + player + "\n";
        }

        var d = new Date();

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var month = months[d.getMonth()];
        var day = d.getDate() ;
        var year = d.getFullYear();
        var time = day + " " + month + " " + year;

        const checkmark = '✅';

        let createEmbed = function(spelers, hex) {        

            if (spelers === "") {spelers = "\u200B";}
            let Embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username)
                .setColor(hex)
                .setTitle('Gameke Time')
                .setThumbnail('https://lh3.googleusercontent.com/xGwxQS8E_TgS53kA02U4OW31mGgrhY6Ey5zrbEP62dFq-BJJmuiMM1B3ACCU5VW0fY8H25SjxWuLF5bWZF-R5uWH')
                //.setDescription('This is a embed test')
                .addFields(
                    {name: "\u200B" + args.join(' '), value: time},
                    {name: 'Spelers ' + players.length + '/' + max + ':', value: spelers}
                    
                )
                .setFooter('Made with ♥ by Flor Werbrouck')
            return Embed;
        }

        let finalEmbed = function(spelers) {
            if (spelers === "") {spelers = "\u200B";}
            let Embed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Gameke Time')
                .setThumbnail('https://lh3.googleusercontent.com/xGwxQS8E_TgS53kA02U4OW31mGgrhY6Ey5zrbEP62dFq-BJJmuiMM1B3ACCU5VW0fY8H25SjxWuLF5bWZF-R5uWH')
                //.setDescription('This is a embed test')
                .addFields(
                    {name: 'Alle plaatsen volzet', value: '\n' + spelers}
                )
                .setFooter('Made with ♥ by Flor Werbrouck')
            return Embed;
        }
        
        message.channel.send("De voting embed staat in <#803626504986558475>");
        client.channels.cache.get('803626504986558475').send("@here");
        let messageEmbed = await client.channels.cache.get('803626504986558475').send(createEmbed(spelers, '#ff0000'));
        let messageEmbedID = messageEmbed.id;
        let messageEmbedChannelID = client.channels.cache.get('803626504986558475').id;
        messageEmbed.react(checkmark);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            
            if (reaction.emoji.name === checkmark) {
                if (reaction.message.id === messageEmbedID) {
                    if (!players.includes(user.username)) {
                        if(players.length === max) {return;}
                        players.push(user.username);
                        spelers = ""
                        for (let player of players){
                            spelers = spelers + player + "\n";
                        }
                        if (players.length === max) {
                            //client.channels.fetch(messageEmbedChannelID).then(channel => channel.messages.fetch(messageEmbedID).then(msg => {
                             //   msg.delete().then(client.channels.cache.get('803626504986558475').send(finalEmbed(spelers)));
                            //}));
                            client.channels.fetch(messageEmbedChannelID).then(channel => channel.messages.fetch(messageEmbedID).then(msg => msg.edit(createEmbed(spelers, '#ffa500')))); 
                            return;
                        }
                    }           
                    client.channels.fetch(messageEmbedChannelID).then(channel => channel.messages.fetch(messageEmbedID).then(msg => msg.edit(createEmbed(spelers, '#ff0000'))));              
                }
            }
            
        })

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            
            if (reaction.emoji.name === checkmark) {
                if (reaction.message.id === messageEmbedID) {
                    if (players.includes(user.username)) {
                        const index = players.indexOf(user.username);
                        players.splice(index, 1);
                        spelers = ""
                        for (let player of players){
                            spelers = spelers + player + "\n";
                        }
                        client.channels.fetch(messageEmbedChannelID).then(channel => channel.messages.fetch(messageEmbedID).then(msg => msg.edit(createEmbed(spelers, '#ff0000'))));               
                    }           
                }
            }
            
        })
    }
}