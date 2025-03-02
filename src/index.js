const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
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
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Hello World!')
            .setDescription('This is a test message.')
            .setTimestamp()
            .setFooter({ text: 'Bot by YourName' });
        message.channel.send({ embeds: [embed] });
    }
});

client.on('messageCreate', message => {
    if (message.content === '!t hoy') {
        const embed = new EmbedBuilder()
            .setColor('#ff9900')
            .setTitle('Hoy!')
            .setDescription(`hoy ka din, ${message.author}! kabadengan mo na naman`)
            .setTimestamp()
            .setFooter({ text: 'Bot by YourName' });
        message.channel.send({ embeds: [embed] });
    }
});

client.on('messageCreate', message => {
    if (message.content.startsWith('!t greet')) {
        const mentionedUser = message.mentions.users.first();
        const mentionedRole = message.mentions.roles.first();

        if (mentionedUser) {
            const embed = new EmbedBuilder()
                .setColor('#00ff99')
                .setTitle('Greeting')
                .setDescription(`Hello, ${mentionedUser}!`)
                .setImage('https://tenor.com/view/donkeh-gif-5283271841714383219')
                .setTimestamp()
                .setFooter({ text: 'Bot by YourName' });
            message.channel.send({ embeds: [embed] });
        } else if (mentionedRole) {
            const members = mentionedRole.members.map(member => member.user).join(', ');
            const embed = new EmbedBuilder()
                .setColor('#00ff99')
                .setTitle('Greeting')
                .setDescription(`Hello, ${members}!`)
                .setImage('https://tenor.com/view/donkeh-gif-5283271841714383219')
                .setTimestamp()
                .setFooter({ text: 'Bot by YourName' });
            message.channel.send({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('Please mention a user or a role to greet.')
                .setTimestamp()
                .setFooter({ text: 'Bot by YourName' });
            message.channel.send({ embeds: [embed] });
        }
    }
});

client.on('messageCreate', message => {
    if (message.content.startsWith('!t coinflip')) {
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('Please mention a user to play coinflip with.')
                .setTimestamp()
                .setFooter({ text: 'Bot by YourName' });
            message.channel.send({ embeds: [embed] });
            return;
        }

        message.channel.send('Flipping the hell out of the coins...').then(() => {
            setTimeout(() => {
                const result = Math.random() < 0.5 ? 'win' : 'lose';
                const embed = new EmbedBuilder()
                    .setColor(result === 'win' ? '#00ff00' : '#ff0000')
                    .setTitle('Coinflip Result')
                    .setDescription(result === 'win' ? `You win, ${message.author}! \nYou lose, ${mentionedUser}!` : `You lose, ${message.author}! You win, ${mentionedUser}!`)
                    .setTimestamp()
                    .setFooter({ text: 'Bot by YourName' });
                message.channel.send({ embeds: [embed] });
            }, 3000);
        });
    }
});

client.on('messageCreate', async message => {
    if (message.content.startsWith('!t weather')) {
        const args = message.content.split(' ');
        const city = args.slice(2).join(' ');

        if (!city) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('Please provide a city.')
                .setTimestamp()
                .setFooter({ text: 'Bot by YourName' });
            message.channel.send({ embeds: [embed] });
            return;
        }

        const locationUrl = `https://www.metaweather.com/api/location/search/?query=${city}`;

        try {
            const locationResponse = await axios.get(locationUrl);
            if (locationResponse.data.length === 0) {
                const embed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('Could not find the city. Please make sure the city name is correct.')
                    .setTimestamp()
                    .setFooter({ text: 'Bot by YourName' });
                message.channel.send({ embeds: [embed] });
                return;
            }

            const woeid = locationResponse.data[0].woeid;
            const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;

            const weatherResponse = await axios.get(weatherUrl);
            const weather = weatherResponse.data.consolidated_weather[0];
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Weather in ${locationResponse.data[0].title}`)
                .setDescription(`${weather.weather_state_name}`)
                .addFields(
                    { name: 'Temperature', value: `${weather.the_temp.toFixed(1)}°C`, inline: true },
                    { name: 'Humidity', value: `${weather.humidity}%`, inline: true },
                    { name: 'Wind Speed', value: `${weather.wind_speed.toFixed(1)} mph`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'Weather data provided by MetaWeather' });
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching weather data:', error);
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('Could not retrieve weather data. Please try again later.')
                .setTimestamp()
                .setFooter({ text: 'Bot by YourName' });
            message.channel.send({ embeds: [embed] });
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN).catch(err => {
    console.error('Failed to login:', err);
});