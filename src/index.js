const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
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

      message.channel.send('Flipping the hell out of coins...').then(() => {
          setTimeout(() => {
              const result = Math.random() < 0.5 ? 'win' : 'lose';
              if (result === 'win') {
                  message.channel.send(`You win, ${message.author}! You lose, ${mentionedUser}!`);
              } else {
                  message.channel.send(`You lose, ${message.author}! You win, ${mentionedUser}!`);
              }
          }, 3000);
      });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
