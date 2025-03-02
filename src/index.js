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

        const locationUrl = `https://www.metaweather.com/api/location/search/?query=${city}`;

        try {
            const locationResponse = await axios.get(locationUrl);
            if (locationResponse.data.length === 0) {
                message.channel.send('Could not find the city. Please make sure the city name is correct.');
                return;
            }

            const woeid = locationResponse.data[0].woeid;
            const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;

            const weatherResponse = await axios.get(weatherUrl);
            const weather = weatherResponse.data.consolidated_weather[0];
            const weatherInfo = `The weather in ${locationResponse.data[0].title} is ${weather.weather_state_name} with a temperature of ${weather.the_temp.toFixed(1)}°C.`;
            message.channel.send(weatherInfo);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            message.channel.send('Could not retrieve weather data. Please try again later.');
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN).catch(err => {
    console.error('Failed to login:', err);
});