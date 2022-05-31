// in terminal 'node .' om bot te starten ent ctrl + c om af te sluiten
const Discord = require('discord.js');

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '-';

// om andere JS files open te doen
const fs = require('fs');

client.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandfiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('CSGOTeamPicker is online!');
    
    var time = new Date().toLocaleString()
    
    client.channels.cache.get('799382974457970721').send('Beep Boop ik ben opgestart');

    client.channels.cache.get('796518869568061512').send({embed: {
        color: '#9B00FF',
        title: "CSGOTeamPicker#2546",
        thumbnail: {url: 'https://lh3.googleusercontent.com/xGwxQS8E_TgS53kA02U4OW31mGgrhY6Ey5zrbEP62dFq-BJJmuiMM1B3ACCU5VW0fY8H25SjxWuLF5bWZF-R5uWH'},
        description: "Start up time: " + time,
        footer: { text: "Made with love by  Flor Werbrouck" }
    }});
});

setInterval(function(){ 
    client.commands.get('read').execute(Discord, client);
}, 60000);

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //if(command === 'read'){
    //    client.commands.get('read').execute(message, args, Discord, client);
    //}
    
    if(command === 'gameke'){
        client.commands.get('embed').execute(message, args, Discord, client);
    }

    //if(command === 'close'){
    //    client.commands.get('close').execute(message, args, Discord, client);
    //}
    
    //if(command === 'close'){
    //    client.commands.get('embed').execute(message, args, Discord, client);
    //}
});

// moet op einde van de code
client.login(process.env.API_KEY);