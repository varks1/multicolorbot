const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://rgbbot.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const config = require('./config.json');
const disco = new Discord.Client();
const prefix = config.prefix;
const allowedUsers = config.allowedUsers;
const roles = config.roleToDisco;

disco.on("ready", () => {
    disco.user.setPresence({ game: { name: `PLC 4L` }, type: 0 });
    console.log("Disco Role Active.");
});

disco.on("message", message => {

  function discoRole() {
    let random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    roles.forEach((role) => {
      let theRole = message.guild.roles.find("name", role);
      theRole.edit({color: random}).catch(e => {
        
      });
    });
  }

  if(message.content.startsWith(prefix + "ON")) {
    setInterval(() => { discoRole(); }, config.ms);
    const embed = new Discord.RichEmbed()
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**亗PLC亗**", `ON`)

 
  return message.channel.sendEmbed(embed);
};
  if(message.content.startsWith(prefix + "OFF")) {
setTimeout(() => { console.log(process.exit(0)); }, 300);
const embed = new Discord.RichEmbed()
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**亗PLC亗**", `OFF`)

 
  return message.channel.sendEmbed(embed);
};
 
  

});

disco.login(config.token);
