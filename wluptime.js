const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const Discord = require("discord.js")
const fetch = require('node-fetch');
const app = express();
const client = new Discord.Client();
const prefix = 'u!' //PREFİX

client.on("ready", () => {
    client.user.setActivity(`/yardım `, { type: "PLAYING" });
});

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const De = Linkler.map(Revenge => Revenge.url)
De.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Başarıyla Uptime Edildi!`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif Edildi!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])  
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')

  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.MessageEmbed()
    .setColor('527C97')
    .setDescription(`
    
    **Link Sistemde Zaten Bulunuyor.** 

    `)
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const success = new Discord.MessageEmbed()
    .setColor('527C97')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    
    **Yazdığınız Site Başarıyla Uptime Sistemimize Eklendi. **
    `)
    message.channel.send(success)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const dijitaluptime = new Discord.MessageEmbed()
  .setColor('527C97')
  .setDescription(`

  **Lütfen Bir Uptime Edeceğim URL'yi Girin!**

  `)
  message.channel.send(dijitaluptime)
  })
  }

  



  if(Split[0] == prefix+'say') {
  const say = new Discord.MessageEmbed()
  .setColor('527C97')
  .setThumbnail(message.author.avatarURL)
  .setDescription(`

**WL uptime Eklediğin \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tane Linkini Uptime ediyor! **
`)
  message.channel.send(say)
  }

  if(Split[0] == prefix+'yardım') {
  const pxd = new Discord.MessageEmbed()
  .setColor('527C97')
  .setThumbnail(message.author.avatarURL)
  .setDescription(`


`)
  .addField('** WL uptime  - Yardım**',`
» **!ekle (Glitch Show Linki)** = Botunuzu 7/24 Aktif Tutar.
» **!linkler** = 7/24 Tuttuğum Linkleri Gösterir.
» **!say** = Tüm Uptime Edilmiş Bot Sayısını Gösterir.

**Uptime Nedir? uptime, Şuan Hizmetde Bulunan Bir Uptime Robotudur. Robot, Her Ayda 1000 Saat Olmak Üzere Çalışır. 1000 Saat Dolduğunda Sistem Çevrimdışı Bırakılır. Sistem Çevrimdışı Bırakıldığı Zaman Uptime Edilen Linkler Downtime Edilir. 1 Ay Dolduğunda Linkler Otomatik Olarak Tekrar Uptime Edilir ve Sistem Çevrimiçi Hale Getirilir.**

**Yapımcısı: WoLLeXeR**
`)
  .setImage("")

  message.channel.send(pxd)
  }

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('527C97').setDescription(`**<:moderasyon:930083034991042700> Hiç Uptime Edilmiş Bir Linkin Yok.**`))
    message.channel.send(new Discord.MessageEmbed().setColor('527C97').setDescription(`**Kontrol Ediliyor...**`))
    message.author.send(new Discord.MessageEmbed().setColor('527C97').setDescription(`** Normal Linklerin:** \n\n\``+Linkleri.join('\n')+`\``))
    }


  
})

//Bot Sistemi




client.on('ready', () => {
  client.user.setActivity(`/yardım `, { type: 'PLAYING' })
client.user.setStatus('dnd')
  
  //client.user.setStatus('online') -> çevrimiçi -> PARADOX DEVELOPMENT
  //client.user.setStatus('dnd') -> rahatsız etmeyin -> PARADOX DEVELOPMENT
})
  client.on('ready', () => {

  // Oynuyor Kısmı
  
      var actvs = [
        `${prefix}yardım `,
        `DM Önerilir!`, 
        `\`${db.get('Proje')}\` Tane Link Uptime Edilmekte!`
    ];
})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["509417115439071233"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}
client.login(process.env.token);


client.on("ready", () => {
})
const liste = ["PLAYING","WATCHING","LISTENING","STREAMING"];
   const listeiki = ["u!yardım (DM Önerilir)","WL Uptime Sistemi","İnstagram: a.wollexer"];
    setInterval(()=>{
        client.user.setActivity(listeiki[Math.floor(Math.random()*listeiki.length)], { type: liste[Math.floor(Math.random()*liste.length)],url:"https://twitch.tv/wollexer"});
    },5000);