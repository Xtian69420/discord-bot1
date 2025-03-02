const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Project is running!");
});

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

app.get("/", (req, res) => {
    res.send("Hello world!");
});

client.on('messageCreate', message => {
    if (message.content === '!t') {
        message.channel.send('Hello World!');
    }
});

client.on('messageCreate', message => {
    if (message.content === '!t hoy') {
        message.channel.send(`hoy ka din, ${message.author}! kabadengan mo na naman`);
    }
});

client.on('messageCreate', message => {
    if (message.content.startsWith('!t greet')) {
        const mentionedUser = message.mentions.users.first();
        const mentionedRole = message.mentions.roles.first();

        if (mentionedUser) {
            message.channel.send(`Hello, ${mentionedUser}!`);
            message.channel.send('https://tenor.com/view/donkeh-gif-5283271841714383219');
        } else if (mentionedRole) {
            const members = mentionedRole.members.map(member => member.user).join(', ');
            message.channel.send(`Hello, ${members}!`);
            message.channel.send('https://tenor.com/view/donkeh-gif-5283271841714383219');
        } else {
            message.channel.send('Please mention a user or a role to greet.');
        }
    }
});

client.on('messageCreate', message => {
    if (message.content.startsWith('!t coinflip')) {
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send('Please mention a user to play coinflip with.');
            return;
        }

        message.channel.send('Flipping the hell out of the coins...').then(() => {
            setTimeout(() => {
                const result = Math.random() < 0.5 ? 'win' : 'lose';
                if (result === 'win') {
                    message.channel.send(`You win, ${message.author}! \nYou lose, ${mentionedUser}!`);
                } else {
                    message.channel.send(`You lose, ${message.author}! You win, ${mentionedUser}!`);
                }
            }, 3000);
        });
    }
});

client.on('messageCreate', async message => {
    if (message.content.startsWith('!t weather')) {
        const args = message.content.split(' ');
        const city = args.slice(2).join(' ');

        if (!city) {
            message.channel.send('Please provide a city.');
            return;
        }

        const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            const weather = response.data;
            const weatherInfo = `The weather in ${weather.name} is ${weather.weather[0].description} with a temperature of ${weather.main.temp}°C.`;
            message.channel.send(weatherInfo);
        } catch (error) {
            message.channel.send('Could not retrieve weather data. Please make sure the city name is correct.');
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN).catch(err => {
    console.error('Failed to login:', err);
});