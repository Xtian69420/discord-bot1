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

const imageLinks = [
    'https://pbs.twimg.com/media/DTeAa4fUQAEr38F.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD-yPPVZY5sj_fpx422eR_qBl7mDKBOnM0K88iW4SDS8oiDLZFqbDZSytW&s=10', 
    'https://media.tenor.com/T2sgUDZt6CcAAAAM/hi-hello.gif', 'https://media.tenor.com/M6hQzq3Ay-sAAAAM/cute-cat-cute.gif', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHbKrPfgB0obVs5wmUtS8EkoWFFlLHUEmAz5VTMVE_oSOMF68awVqcZXo&s=10', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVis4FCic_wYwNdNXTirjlLa1t2bdv91Wh4j9tN-YT3jnVZwbDsQIThk&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUN6gouAccx471rOGOS6evTqc2133y04invAg1H-UGxuhJFYarclhhzJA&s=10'
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageLinks.length);
    return imageLinks[randomIndex];
}

client.on('messageCreate', message => {
    if (message.content === '!t') {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Hello World!')
            .setDescription('This is a test message.')
            .setTimestamp()
            .setFooter({ text: '0-0' });
        message.channel.send({ embeds: [embed] });
    }
});

client.on('messageCreate', message => {
    if (message.content === 'fuck you') {
        const embed = new EmbedBuilder()
            .setColor('#ff9900')
            .setTitle('Fuck you too!')
            .setDescription(`${message.author} \n You know, every time I see you, I’m reminded that sometimes, fashion choices can be just as bewildering as a plot twist in a bad movie. I mean, the way you put together an outfit is like an abstract art project gone wrong; it’s open to interpretation, but I’m still trying to figure out what it’s supposed to mean. Seriously, though, I didn’t know they made “laundry basket chic” a trend—kudos for rocking that look! Your hair seems to have a mind of its own, which is impressive because it clearly doesn’t follow any known laws of physics. There’s a distinct chance that your reflection in the mirror is just as confused as the rest of us about why you decided to accessorize with that five-day-old pizza stain. And speaking of things that leave us all scratching our heads, let's talk about your mom. Bless her heart; she clearly poured all her effort into raising you to be a “unique” individual. I mean, it must have taken a lot of love and patience to guide someone like you through life. She deserves a medal for keeping a straight face while watching you navigate the world. I can only imagine family gatherings where she has to explain to friends why her child’s idea of style is akin to a three-year-old playing dress-up. Your mom has got to be a magician, though, because every time you walk out the door, she must be casting spells to make you seem normal from a distance. You’ve got to give her credit; she’s mastered that whole “I love you no matter what” mom mantra like it’s an Olympic sport. And let’s not forget how she (probably) tells everyone that you were just “going through a phase” whenever they ask what happened to your sense of style.  But really, your mom is the unsung hero behind your misadventures. She raised a true original—and by original, I mean one of a kind! It’s a tough job being your mom, and while you may have turned out a little different, I’m sure somewhere deep down, she knows that it’s all part of her grand design. After all, your existence truly keeps life entertaining—for you, for her, and for all of us! Keep being you; it’s a true family legacy at this point!`)
            .setTimestamp()
            .setFooter({ text: '0-0' });
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
            .setFooter({ text: '0-0' });
        message.channel.send({ embeds: [embed] });
    }
});

client.on('messageCreate', message => {
    if (message.content.startsWith('!t greet')) {
        const mentionedUser = message.mentions.users.first();
        const mentionedRole = message.mentions.roles.first();
        const randomImage = getRandomImage();

        if (mentionedUser) {
            const embed = new EmbedBuilder()
                .setColor('#00ff99')
                .setTitle('Greeting')
                .setDescription(`Hello, ${mentionedUser}!`)
                .setImage(randomImage)
                .setTimestamp()
                .setFooter({ text: '0-0' });
            message.channel.send({ embeds: [embed] });
        } else if (mentionedRole) {
            const members = mentionedRole.members.map(member => member.user).join(', ');
            const embed = new EmbedBuilder()
                .setColor('#00ff99')
                .setTitle('Greeting')
                .setDescription(`Hello, ${members}!`)
                .setImage(randomImage)
                .setTimestamp()
                .setFooter({ text: '0-0' });
            message.channel.send({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('Please mention a user or a role to greet.')
                .setTimestamp()
                .setFooter({ text: '0-0' });
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
                .setFooter({ text: '0-0' });
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
                    .setFooter({ text: '0-0' });
                message.channel.send({ embeds: [embed] });
            }, 3000);
        });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN).catch(err => {
    console.error('Failed to login:', err);
});