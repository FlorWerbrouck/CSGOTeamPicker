module.exports = {
    name: 'read',
    discription: "read all messages in text channel gameke time",
    execute(Discord, client){
        const channel = client.channels.cache.get("803626504986558475");
        
        var dateNow = new Date()

        let checkMessage = function(message) {
            let diffTime = dateNow - message.createdAt;
            if( diffTime > 72000000 ) {
                channel.messages.fetch(message.id).then(msg => {
                    msg.delete();
                });
            }        
        }

        channel.messages.fetch({ limit: 100 }).then(messages => {
        //Iterate through the messages here with the variable "messages".
        messages.forEach(message => checkMessage(message))
        })
        //console.log('Dit bericht word elke minuut verstuurt');
    }
}