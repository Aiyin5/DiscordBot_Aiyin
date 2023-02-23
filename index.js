const { request } = require('undici');
const { Client, Events,GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,GatewayIntentBits.DirectMessages] });
const {data}=require('./data/beforInterception.json');
const {nounwords}=require('./data/noun_words.json');

client.commands = new Collection();
client.datamap = new Map(Object.entries(data));
client.nounwordsmap = new Map(Object.entries(nounwords));

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

const { token } = require('./config.json');

//data_check_console


(async () => {
    //console.log(client.nounwordsmap.keys());
    for (file of functions) {
        require(`./src/functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(token);
})();