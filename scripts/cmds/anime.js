const fs = require('fs');
const axios = require('axios');
const path = require('path');

module.exports = {
    config: {
        name: "anime",
        version: "1.0",
        author: "𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎",
        countDown: 5,
        role: 0,
        shortDescription: "Envoie des vidéos d'anime",
        longDescription: "Cette commande envoie une vidéo aléatoire d'anime.",
        category: "fun",
    },
    onStart: async function ({ api, event }) {
        try {
            const videoUrls = [
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
                // Ajoutez d'autres liens de vidéos d'anime ici
            ];

            const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
            const tmpFolderPath = path.join(__dirname, 'tmp');

            if (!fs.existsSync(tmpFolderPath)) {
                fs.mkdirSync(tmpFolderPath);
            }

            const videoResponse = await axios.get(randomVideoUrl, { responseType: 'arraybuffer' });
            const videoPath = path.join(tmpFolderPath, 'anime_video.mp4');

            fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

            await api.sendMessage({
                body: `🎬 **Profite de cette vidéo, Champion 🖤 !** \n\n𒆜──────𒆜\n\n**🍿 Voici un anime spécialement pour toi, choisis avec soin !**`,
                attachment: fs.createReadStream(videoPath)
            }, event.threadID);

            // Supprimez le fichier temporaire
            fs.unlinkSync(videoPath);
        } catch (error) {
            console.error('Erreur dans la commande Anime:', error);
            api.sendMessage('⚠ Une erreur est survenue lors de l\'envoi de la vidéo.', event.threadID);
        }
    }
};
