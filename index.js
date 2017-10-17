const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const embed = new Discord.RichEmbed()

client.login(config.token);

client.on("ready", () => {
  
  console.log(`Estamos Online! Data: ${new Date()} `)
client.user.setStatus('dnd')
client.user.setGame('-ajuda' , 'https://twitch.tv/ladonegro');

});


client.on('message', message => {
  if (message.content.startsWith(prefix + "ping")) {
    message.delete(1000);
       message.reply(`Pong!`)
  }

 })

client.on('message', function(message) {
  if (message.content.startsWith(prefix + "data")) {
  message.delete(1000);
    message.channel.send({embed: {
  color: 0xff0000,
  description:`**Data:** ${new Date()}`,
    }})}
    });

client.on('message', function(message) {
  if (message.content.startsWith(prefix + "client")) {
  message.delete(1000);
    message.channel.send({embed: {
  color: 0xff0000,
  description:`Estamos online em ${client.guilds.size} servidores, com ${client.users.size} usuários`,
    }})}
    });


const fs = require("fs");

let points = JSON.parse(fs.readFileSync("./points.json"));

const prefix = "-";

client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[message.author.id];
  userData.points++;

  let curLevel = Math.floor(0.5 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`Wow Você upou! Seu nível agora é ${curLevel}. Parabéns! :smile:`);
  }

  if (message.content.startsWith(prefix + "level")) {
    message.reply(`Você está em um nível atual ${userData.level}, com ${userData.points} pontos.`);
  }
  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

});

client.on("message", message => {
if(message.content.startsWith(prefix+ 'roleta')){
randomNumber = Math.floor(Math.random() * (6 - 1 ) + 1)
if (randomNumber == 2){
  message.reply("Morreu :gun: ");
}
else{
  message.reply("Sobreviveu! :clap: ")
}
}
});

client.on('message', message => {
    if (message.content.startsWith(prefix + "apagar")) {
const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('Especifique um número de mensagens a serem apagadas!');
if (!amount && !user) return message.reply('Você deve espeficificar um usuário mais a quantidade de mensagens a serem apagadas ou utilizar o comando apagar mais a quantidade de mensagens.');
message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
})
    }
});



client.on('message', function(message) {
if(message.content.startsWith(prefix + 'avatar')){
  message.delete(1000);

      let img = message.mentions.users.first()
      if (!img) {

          const embed = new Discord.RichEmbed()
          .setImage(`${message.author.avatarURL}`)
          .setColor(0xff0000)
          .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
          message.channel.send({ embed });

      } else if (img.avatarURL === null) {

          message.channel.sendMessage("Este usuário ("+ img.username +") não possui um avatar!");

      } else {

          const embed = new Discord.RichEmbed()
          .setImage(`${img.avatarURL}`)
          .setColor(0xff0000)
          .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
          message.channel.send({ embed });

      };

  }
  

if(message.content.startsWith(prefix + 'server')){
  message.delete(1000);

    var server = message.guild;
  
    const embed = new Discord.RichEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(server.name, server.iconURL)
    .addField('ID', server.id, true)
    .addField('Região', server.region, true)
    .addField('Criado em', server.joinedAt.toDateString(), true)
    .addField('Supremo do Servidor', server.owner.user.username+'#'+server.owner.user.discriminator, true)
    .addField('ID do Supremo', server.owner.user.id, true)
    .addField('Membros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .addField('Bot Desenvolvido por', "Adriano#3173")
    .setColor(0xff0000)
    
   message.channel.send({ embed });

  }

  if(message.content.startsWith(prefix + 'user')){
    message.delete(1000);
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jogando', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Apelido dentro do servidor', message.member.nickname, true)
        .addField('Conta criada em', user.createdAt.toDateString(), true)
        .addField('Ingressou no servidor em', message.member.joinedAt.toDateString())
        .addField('Roles/Cargos', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0xff0000)
        
       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jogando', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Conta Crianda Em:', userm.createdAt.toDateString(), true)
      .addField('Bot Desenvolvido por', "Adriano#3173")
      .setColor(0xff0000)
      
     message.channel.send({ embed });
    }
}

});

client.on('message', message => {
   if (message.content.startsWith("-fale")) {
      message.delete(1000); 
      message.channel.send(message.content.slice(5, message.content.length));
   }
 });

 client.on('message', function(message) {
  if (message.content.startsWith(prefix + "ajuda")) {

  message.delete(1000);
    message.channel.send({embed: {
  color: 0xff0000,
  description: "**Meus comandos:** \n  \n **-ping** \n Respondo: Pong!  \n **-fale** \n Repete qualquer palavra ou frase. \n **-apagar + 2/100 ou -apagar + @menção + 2/100** \n Apago mensagens do chat ou um usuário especifico. \n **-kick** \n Expulso usuários do servidor. \n **-ban** \n Bano usuários do servidor. \n **-cmdadmin** \n Verifico se você tem cargos Administrativo. \n **-data** \n Verifico uma data e hora completa. \n **-client** \n Verifico os servidores onde eu me encontro e um total de usuários. \n **-user** \n Você pode ver informações suas ou de outro usuário mencionando-o \n **-avatar** \n Você pode visualizar seu avatar ou de outro usuário mencionando-o \n **-server** \n Lhe dá informações do servidor. \n **-level** \n Verifico seu level global \n **-roleta** \n Jogue Roleta Russa \n **-reverse** \n Ulitize esse comando para eu modificar suas palavras e frases ao contrário. \n \n \n **Expextre v.2 | By Adriano#3173 e Lord.Archangel#9647. \n \n **Meu site:** \n https://expectre.wixsite.com/expextre \n Em desenvolvimento - Homenagem ao Lado Negro. **"
    }
})
  }
    });

 client.on('message', function(message) {
  if (message.content.startsWith(prefix + "ban")) {
        // Easy way to get member object though mentions.
        var member= message.mentions.members.first();
        // Kick
        member.ban().then((member) => {
            // Successmessage
            message.channel.send("**O usuário** " + member.displayName + " **foi banido do servidor!** ");
        }).catch(() => {
             // Failmessage
            message.channel.send("Falha no comando.");

        });
  }
});

 client.on('message', function(message) {
  if (message.content.startsWith(prefix + "kick")) {
        // Easy way to get member object though mentions.
        var member= message.mentions.members.first();
        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send("**O usuário** " + member.displayName + " **foi desconectado do servidor!** ");
        }).catch(() => {
             // Failmessage
            message.channel.send("Falha no comando.");

        });
  }
});

client.on('message', message => {
    if (message.content.startsWith(prefix + "reverse")) {

    // So the bot doesn't reply to iteself
    if (message.author.bot) return;
    
    // Check if the message starts with the `!` trigger
    if (message.content.indexOf('-') === 0) {
        // Get the user's message excluding the `!`
        var text = message.content.substring(1);
        
        // Reverse the message
        var reversed = '';
        var i = text.length;
        
        while (i > 0) {
            reversed += text.substring(i - 1, i);
            i--;
        }
        
        // Reply to the user's message
        message.reply(reversed);
    }
    }
});
 
 client.on(`message`, message => {
      if (message.content === "-cmdadmin") {
        let modRole = message.guild.roles.find("name", "Developers", "Staff", "Moderator", "ADM", "MOD", "Moderators");
        if(message.member.roles.has(modRole.id)) {
          message.channel.sendMessage(`Você é um Moderador!`)
        } else {
          return message.reply("Você não tem permissões de Moderador. :(")
        }
      }
    });

client.on('message', message => {
  if (message.content.startsWith('-play')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Você não está conectado em um canal!`);
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
      });
  }
});
