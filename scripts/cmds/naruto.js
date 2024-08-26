const fs = require('fs');
const axios = require('axios');
const path = require('path');

module.exports = {
    config: {
        name: "naruto",
        version: "1.0",
        author: "𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎",
        countDown: 5,
        role: 0,
        shortDescription: "Envoie une vidéo de Naruto",
        longDescription: "Cette commande envoie une vidéo aléatoire de Naruto.",
        category: "fun",
    },
    onStart: async function ({ api, event }) {
        try {
            const videoUrls = [
                "https://i.imgur.com/9vCNzms.mp4",
                "https://i.imgur.com/h6J9tkb.mp4",
                // Ajoutez d'autres liens de vidéos ici
            ];

            const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
            const tmpFolderPath = path.join(__dirname, 'tmp');

            if (!fs.existsSync(tmpFolderPath)) {
                fs.mkdirSync(tmpFolderPath);
            }

            const videoResponse = await axios.get(randomVideoUrl, { responseType: 'arraybuffer' });
            const videoPath = path.join(tmpFolderPath, 'naruto_video.mp4');

            fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

            await api.sendMessage({
                body: "Voici une vidéo de Naruto pour vous 🍥",
                attachment: fs.createReadStream(videoPath)
            }, event.threadID);

            // Supprimez le fichier temporaire
            fs.unlinkSync(videoPath);
        } catch (error) {
            console.error('Erreur dans la commande Naruto:', error);
            api.sendMessage('⚠ Une erreur est survenue lors de l\'envoi de la vidéo.', event.threadID);
        }
    }
};
