require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
	if (msg.content === '$callbot') {
		msg.channel.send(
			'**Beep boop...**\n\I`m here, how can I help you?\n\For help type $help.'
		)
	}

	else if (msg.content === '$help') {
    	msg.channel.send('**Commands**\n- $help\n- $votekick.');
  	}

  	else if (msg.content.startsWith('$votekick')) {
  		if (msg.mentions.users.size) {
    		const taggedUser = msg.mentions.users.first();

    		msg.channel.send(`Vote kick for: ${taggedUser.username}`);
  		} else msg.reply('Please tag a valid user!');
	}
});

bot.login(TOKEN);