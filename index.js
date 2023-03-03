const { request } = require('undici');
const { Client, Events,GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const url = require('url');
const { token,SecretId,SecretKey } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,GatewayIntentBits.DirectMessages] });
const  preDataMap=require('./data/perception.json');
client.commands = new Collection();
client.preData =preDataMap;

const cosInstance =require("./cosFuntion.js");
const cosItem = new cosInstance(SecretId,SecretKey);
const server =require("./src/server/server");
const { join } =require ('path');
const path = join(__dirname,'perceptConfig.json');

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    console.log(await cosItem.getItem(path));
    client.preData=require('./perceptConfig.json');
    server(client,cosItem,path);
    //console.log(client.nounwordsmap.keys());
    for (file of functions) {
        require(`./src/functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(token);
})();