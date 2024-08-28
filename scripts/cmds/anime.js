const axios = require('axios');const fs = require('fs');module.exports = {
    config: {
        name: "anime",
        version: "1.0",
        author: "๖ۣ•҉♫✞𝐂𝐢𝐝×͜×𝐊𝐚𝐠𝐞𝐧𝐨✞♫๖ۣ•҉",
        countDown: 5,
        role: 0,
        shortDescription: "Send a random anime video",
        longDescription: "Send a random cool anime moment video",
        category: "entertainment",
    },
    onStart: async function({ message }) {
        const videoUrls = [
            "https://i.imgur.com/EhUUsmK.mp4",
            "https://i.imgur.com/VZvWKTm.mp4",
            "https://i.imgur.com/JiN1ATw.mp4",
            "https://i.imgur.com/pOJhbC7.mp4",
            "https://i.imgur.com/KfnCYVH.mp4",
            "https://i.imgur.com/XXoTyba.mp4",
            "https://i.imgur.com/mcLfGN9.mp4",
            "https://i.imgur.com/KgHRNxE.mp4",
            "https://i.imgur.com/xGJ6TBJ.mp4",
            "https://i.imgur.com/xh7WUyr.mp4",
            "https://i.imgur.com/kiOTzWy.mp4",
            "https://imgur.com/uGjRj5g.mp4",
            "https://imgur.com/a/viBkCqA.mp4",
            "https://imgur.com/a/xLZBbwv.mp4",
            "https://i.imgur.com/pN86BlW.mp4",
            "https://i.imgur.com/OSxu5ev.mp4",
            "https://i.imgur.com/ChdcgK6.mp4",
            "https://i.imgur.com/aPeTZp4.mp4",
            "https://i.imgur.com/XksDoIq.mp4",
            "https://i.imgur.com/SK29wFq.mp4",
            "https://i.imgur.com/ZEuCpPW.mp4",
            "https://i.imgur.com/6bnmHrG.mp4"
        ];

        // Choisir une URL aléatoire
        const randomUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
        const caption = "๖ۣ•҉°𝐀𝐍𝐈𝐌𝐄♫🎀♫𝐌𝐎𝐌𝐄𝐍𝐓๖ۣ•҉";

        try {
            const response = await axios.get(randomUrl, { responseType: 'stream' });
            const path = `./animeMoment-${Date.now()}.mp4`; // Unique file path for each video
            const writer = fs.createWriteStream(path);

            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', async () => {
                    try {
                        await message.reply({
                            body: `\n${caption}\n`,
                            attachment: fs.createReadStream(path)
                        });
                        fs.unlinkSync(path); // Supprimer le fichier local après envoi
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                });

                writer.on('error', (err) => {
                    reject(err);
                });
            });
        } catch (error) {
            console.error(`Erreur lors du téléchargement de la vidéo ${randomUrl}: `, error);
            await message.reply("❌ Impossible de télécharger la vidéo.");
        }
    }
};
