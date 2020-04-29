'use strict';

require('dotenv').config()

const guild = 						require('guild')
const { Client, MessageEmbed } = 	require('discord.js')

const client = new Client()

const TOKEN = process.env.TOKEN

client.on('ready', () => {
	console.info(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
	if (msg.content === '$callbot') {
		msg.channel.send(
			'**Beep boop...**\n\Hello, I`m here, how can I help you?\n\For help type $help.'
		)

		msg.react('✋') // ✋ = :raised_hand:
	}

	else if (msg.content === '$help') {
		const embed = new MessageEmbed()

		.setTitle('Dragon-Tech Support')
		.setColor(0xd4c222)
		.setDescription('**Commands**:\n- $help\n- $votekick\n- $staff\n- $ping\n- $avatar');

	    msg.channel.send(embed);
	}

  	else if (msg.content === '$votekick') {
  		if (msg.mentions.users.size) {
    		const taggedUser = msg.mentions.users.first()

    		msg.channel.send(`Vote kick for: ${taggedUser.username}`)
  		} else msg.reply('Please tag a valid user!')
	}

	else if (msg.content === '$staff') {
		let
			// Role ID's
			techSupport = "696089336978079805",
			moderator = "696089600560726137",
			hacker = "696088492601507912",
			webDev = "704404302244085851",
			admin = "696083121107632148",
			owner = "696083537698226186",

			// Members with that roles
			membersWithTechSupp = msg.guild.roles.cache.get(techSupport).members,
			membersWithMod = msg.guild.roles.cache.get(moderator).members,
			membersWithHacker = msg.guild.roles.cache.get(hacker).members,
			membersWithWebDev = msg.guild.roles.cache.get(webDev).members,
			membersWithAdmin = msg.guild.roles.cache.get(admin).members,
			membersWithOwner = msg.guild.roles.cache.get(owner).members

		msg.channel.send(`** STAFF TEAM INFORMATION **\n\nOwners: ${membersWithOwner.size} members with that role.\nAdministrators: ${membersWithAdmin.size} members with that role.\nModerators: ${membersWithMod.size} members with that role.\nTech Supports: ${membersWithTechSupp.size} members with that role.\nWeb Developers: ${membersWithWebDev.size} members with that role.\nHackers: ${membersWithHacker.size} members with that role.`)
	}

	// Check ping
	else if (msg.content === '$ping') {
		msg.channel.send("Your ping is `"
			+ `${(Date.now() - msg.createdTimestamp)}` + " ms`")
	}

	else if (msg.content === '$avatar') {
		msg.reply(msg.author.displayAvatarURL());
	}
})

client.login(TOKEN)