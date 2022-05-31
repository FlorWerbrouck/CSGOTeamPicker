module.exports = {
    name: 'close',
    discription: "delete embeds",
    execute(message, args, Discord, client){
        const channel = client.channels.cache.get("803626504986558475");

        let check = 0;

        let checkMessage = function(message) {
            if (args === message.id) {
                check = 1;
            }
        }
        
        if (!args.length) {
            client.channels.cache.get('799382974457970721').send('ERROR: Geen gamekeID meegekregen');
        }      
        else {
            channel.messages.fetch({ limit: 100 }).then(messages => {
                messages.forEach(message => checkMessage(message))
            })

            if (check === 1) {
                client.channels.cache.get('799382974457970721').send('ERROR: ' + args + ' is geen geldige ID');
            }

            if (check === 0) {
                client.channels.fetch(803626504986558475).then(channel => channel.messages.fetch(804372579938336768).then(msg => {
                    client.channels.cache.get('799382974457970721').send('auteur: '+  msg.author);
                }));
            }
        }      
        
    }
}