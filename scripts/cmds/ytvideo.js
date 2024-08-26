const axios = require('axios');

const API_KEY = 'AIzaSyB9qShTA1lPNfw-Vfodp6ZaR_yqQ87HWoI'; // Clé API YouTube

module.exports = {
    config: {
        name: "ytvideo",
        version: "1.0",
        author: "𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎",
        countDown: 5,
        role: 0,
        shortDescription: "Recherche une vidéo YouTube",
        longDescription: "Permet à l'utilisateur de rechercher une vidéo spécifique sur YouTube et l'envoie dans le chat.",
        category: "fun",
    },
    onStart: async function(){},
    onChat: async function({ event, message, prefix }) {
        if (!event.body.startsWith(prefix)) return;

        const args = event.body.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === "ytvideo") {
            if (args.length === 0) {
                return message.reply("⚠ **Erreur :** Vous devez spécifier un terme de recherche. Exemple : `!ytvideo chat mignon`");
            }

            const searchQuery = args.join(" ");
            
            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                    params: {
                        part: 'snippet',
                        q: searchQuery,
                        type: 'video',
                        maxResults: 1,
                        key: API_KEY
                    }
                });

                const video = response.data.items[0];
                if (video) {
                    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
                    const title = video.snippet.title;
                    const description = video.snippet.description;
                    const thumbnail = video.snippet.thumbnails.high.url;

                    // Répondre avec un style plus classe
                    return message.reply(`╔═════════════════════╗
🌟 **✦𝐕𝐈𝐃É𝐎✦ 𝐓𝐑𝐎𝐔𝐕É𝐄 𝐒𝐔𝐑 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 !** 🌟
╚═════════════════════╝

╔. .══════════════════╗
🌐 **✧✦✧ 𝐓𝐈𝐓𝐑𝐄 ✧✦✧ :** *${title}*
📜 **𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍 :** *${description}*
🎨 **𝐌𝐈𝐍𝐈𝐀𝐓𝐔𝐑𝐄 :** [Clique ici](${thumbnail})
🔗 **✧𝐑𝐄𝐆𝐀𝐑𝐃𝐄𝐑✧ :** [Voir la vidéo ici](${videoUrl})
╚. .══════════════════╝

💬 **✦𝐍𝐄 𝐏𝐀𝐒𝐒𝐄 𝐏𝐀𝐒 À 𝐂Ô𝐓É✦**`);
                } else {
                    return message.reply(`❌ **𝑨𝒖𝒄𝒖𝒏𝒆 𝑽𝒊𝒅𝒆́𝒐 𝑻𝒓𝒐𝒖𝒗𝒆́𝒆 !** 
🔍 **𝐏𝐎𝐔𝐑 :** *"${searchQuery}"*`);
                }
            } catch (error) {
                console.error("Erreur lors de l'appel à l'API : ", error);
                return message.reply("⚠ **Erreur :** Une erreur est survenue lors de la recherche de la vidéo. Réessayez plus tard.");
            }
        }
    }
}
