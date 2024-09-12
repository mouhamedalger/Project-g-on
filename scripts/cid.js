const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Assurez-vous que ce module est installé

module.exports = {
  config: {
    name: "cid",
    aliases: ["cid"],
    author: "Aesther",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const loadingMessage = "𝙻𝙾𝙰𝙳𝙸𝙽𝙶......🍀 ";
      await api.sendMessage(loadingMessage, event.threadID);

      const ownerInfo = {
        name: '✞𝐂𝐈𝐃✞',
        gender: '𝗕𝗢𝗬',
        hobby: '𝐅𝐨𝐨𝐭𝐛𝐚𝐥𝐥⚽',
        relationship: '𝐄𝐧 𝐜𝐨𝐮𝐩𝐥𝐞 𝐚𝐯𝐞𝐜 𝐦𝐚 𝐛𝐚𝐞 ๖ۣ•҉°•✮•°𝙰𝙽𝙶𝙴🎀𝑳𝒂𝒆𝒕𝒊𝒕𝒊𝒂°•✮•°๖ۣ•҉',
        facebookLink: '1. 🌟 𝑴𝑬 🌟: https://www.facebook.com/cidkageno228\n2. 💖 𝑴𝒂 𝒃𝒂𝒆 💖: https://www.facebook.com/profile.php?id=61563886136337',
        bio: '★✞𝐂𝐢𝐝✞𝐤𝐚𝐠𝐞𝐧𝐨★ 😉 𝐑ê𝐯𝐞🥱:𝐝𝐞𝐯𝐞𝐧𝐮𝐞 𝐥\'𝐞𝐦𝐢𝐧𝐞𝐧𝐜𝐞 𝐝𝐚𝐧𝐬 𝐥\'𝐨𝐦𝐛𝐫𝐞×͜×'
      };

      const videoUrls = [
        "https://i.imgur.com/9vCNzms.mp4",
        "https://i.imgur.com/h6J9tkb.mp4",
        "https://i.imgur.com/RmMI3dC.mp4",
        "https://i.imgur.com/jeyjWuk.mp4",
        "https://i.imgur.com/HIWaV6d.mp4",
        "https://i.imgur.com/BXmgByZ.mp4",
        "https://i.imgur.com/wuo18rR.mp4",
        "https://i.imgur.com/C4neV9i.mp4",
        "https://i.imgur.com/pdr6e4T.mp4",
        "https://i.imgur.com/OAmV2Wr.mp4",
        "https://i.imgur.com/gPl8sV2.mp4",
        "https://i.imgur.com/nU8Gsyn.mp4"
      ];

      const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
      const tmpFolderPath = path.join(__dirname, 'tmp');

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(randomVideoUrl, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const response = `
        🎩 𝗢𝘄𝗻𝗲𝗿 𝗜𝗻𝗳𝗼 𝗘𝘅𝗰𝗹𝘂𝘀𝗶𝘃𝗲 🍀:
❍⌇─➭ 
🚹 (◍•ᴗ•◍) 𝗡𝗢𝗠 : ${ownerInfo.name}
❍⌇─➭ 
♂️♀️ 𝗚𝗘𝗡𝗥𝗘: ${ownerInfo.gender}
❍⌇─➭ 
⚽ 🎯 𝗣𝗔𝗦𝗦𝗜𝗢𝗡 : ${ownerInfo.hobby}
❍⌇─➭ 
💖 𝗦𝗧𝗔𝗧𝗨𝗦: ${ownerInfo.relationship}
❍⌇─➭ 
🔗 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗟𝗜𝗡𝗞𝗦:
   1. 🌟 𝑴𝑬 🌟: ${ownerInfo.facebookLink.split('\n')[0]}
   2. 💖 𝑴𝒂 𝒃𝒂𝒆 💖: ${ownerInfo.facebookLink.split('\n')[1]}
❍⌇─➭ 
⭐ 𝗕𝗜𝗢: ${ownerInfo.bio} 🇹🇬`;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID);

      // Clean up the temporary file
      fs.unlinkSync(videoPath);
    } catch (error) {
      console.error('Error in owner command:', error);
      api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  },
  onChat: async function({ api, event }) {
    try {
      const lowerCaseBody = event.body.toLowerCase();
      
      if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
        await this.onStart({ api, event });
      }
    } catch (error) {
      console.error('Error in onChat function:', error);
    }
  }
};
