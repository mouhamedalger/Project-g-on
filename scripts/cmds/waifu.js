const axios = require('axios');

module.exports = {
    config: {
        name: "waifu",
        aliases: ["wife"],
        version: "1.1",
        author: "cid kageno",
        countDown: 0,
        role: 0,
        shortDescription: "Get random waifu",
        longDescription: "Get waifu images based on various categories.",
        category: "anime",
        guide: "{pn} {{<name>}}"
    },

    onStart: async function({ message, args }) {
        const categories = [
            'waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'kiss', 'lick', 'hug',
            'awoo', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold',
            'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'
        ];

        const name = args.join(" ");

        if (!name) {
            try {
                let res = await axios.get('https://api.waifu.pics/sfw/waifu'); // Exemple pour Waifu.pics
                let img = res.data.url;

                const form = {
                    body: `『🍑🍆𝐖𝐀𝐈𝐅𝐔🍆🍑』`
                };

                if (img) {
                    form.attachment = await global.utils.getStreamFromURL(img);
                }

                message.reply(form);
            } catch (e) {
                message.reply('Erreur lors de la récupération de l\'image.');
            }
        } else if (categories.includes(name)) {
            try {
                let res = await axios.get(`https://api.waifu.pics/sfw/${name}`); // Exemple pour Waifu.pics
                let img = res.data.url;

                const form = {
                    body: `『🍑🍆𝐖𝐀𝐈𝐅𝐔🍆🍑』`
                };

                if (img) {
                    form.attachment = await global.utils.getStreamFromURL(img);
                }

                message.reply(form);
            } catch (e) {
                message.reply('Erreur lors de la récupération de l\'image.');
            }
        } else {
            message.reply('Catégorie waifu non trouvée : waifu, neko, shinobu, megumin, bully, cuddle, cry, kiss, lick, hug, awoo, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe');
        }
    }
}
