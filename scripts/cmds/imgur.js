const axios = require('axios');
const FormData = require('form-data');

// Utilisez le token d'accès fourni directement
const ACCESS_TOKEN = '5c3118ebb73fbb275945ab340be60b610a3216d6'; // Remplacez par votre propre access token

module.exports = {
    config: {
        name: "imgur",
        version: "1.0",
        author: "Cid Kageno",
        countDown: 5,
        role: 0,
        shortDescription: "Upload an image to Imgur",
        longDescription: "Upload an image to Imgur",
        category: "utility",
        guide: "{pn} <attached image>"
    },

    onStart: async function({ message, event }) {
        try {
            const attachments = event.messageReply.attachments;
            if (!attachments || attachments.length === 0) {
                return message.reply("Please reply to a message with an attached image to upload.");
            }

            const imageUrl = attachments[0].url;
            const form = new FormData();
            form.append('image', imageUrl);

            // Téléversez l'image sur Imgur en utilisant le token d'accès
            const response = await axios.post('https://api.imgur.com/3/image', form, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    ...form.getHeaders()
                }
            });

            if (response.data && response.data.data && response.data.data.link) {
                const imgurLink = response.data.data.link;
                message.reply({ body: `🎁𝐢𝐦𝐚𝐠𝐞 𝐮𝐩𝐥𝐨𝐚𝐝💻 𝐛𝐲 𝐜𝐢𝐝×͜×☛⏳:✨『 ${imgurLink}`』✨ });
            } else {
                message.reply("🙆🙆𝐨𝐨𝐩𝐬.");
            }
        } catch (error) {
            console.error('Error:', error);
            message.reply(`Error: ${error.message}`);
        }
    }
};
