/*=========================================================

					  Dragon-Tech-Bot
					  	Discord Bot

					 Author: Emmett
					 Date: 29th April
				    Copyright (C) 2020

=========================================================*/

'use strict'

// require('dotenv').config()

const fs =							require('fs')
const guild = 						require('guild')
const { Client, MessageEmbed } = 	require('discord.js')

const client = new Client()

// const TOKEN = process.env.TOKEN

const config = require('./config.json')
const UpdateConfig = require('./updatecfg.json')
const Update = 0

client.on('ready', () => {
	console.info(`Logged in as ${client.user.tag}!`)
})

const cmd = require('./commands.js')
client.on('message', async msg => {
	const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();


	function EmbedMessage(title, color, desc) {
		const embed = new MessageEmbed()

		.setTitle(title)
		.setColor(color)
		.setDescription(desc)

		msg.channel.send(embed)
	}

	cmd.cmdsFunction(msg)

	// Embed messages
	if (msg.content === '$help') {
		EmbedMessage(
			'Dragon-Tech Support',
			0xd4c222,
			'**Commands**:\n- $help\n- $votekick\n- $staff\n- $ping\n- $avatar\n- $update'
		)
	}

	else if (msg.content === '$update') {
	    EmbedMessage(
			'Dragon-Tech Update',
			0xd4c222,
			`**Update**:\n- ${Update == 0 ? UpdateConfig.noupdate : UpdateConfig.update}`
		)
	}

	else if (msg.content === '$rules') {
		EmbedMessage(
			'Dragon-Tech Rules',
			0xd4c222,
			'** RULES **\n- Zabranjeno je bilo kakvo vredjanje clanova.\n- Zabranjeno je psovanje, spam...\n- Zabranjeno je reklamiranje.\n- Zabranjeno je slanje eksplicitnih poruka, slika (nsfw)...\n- Pisati iskljucivo srpsko-hrvatskim pismom (latinicom).\n\nNe trazite role za administratora, moderatora itd, dobija se po zasluzi.'
		)
	}

	else if (msg.content === '$deletemsg') {
		msg.delete({ timeout: 500 })
		msg.channel.send('Deleted msg.')
	}

	else if (command === 'idea') {
		const text = args.join(" ")

		fs.appendFile('ideas.txt', `\n${text}`, function (err) {
			if (err)
				throw err

			console.log('Saved.')

			msg.reply(`Predlozili ste ideju: ${text}.`)
		})
	}

	else if (command === 'botmsg') {
		if (msg.member.roles.cache.has('705425320265908225') ||
			msg.member.roles.cache.has('705466773046296656')) {
			const message = args.join(" ")

			msg.delete({ timeout: 500 })
			msg.channel.send(message)
		}
	}
})

client.login(config.token)
