const axios = require('axios');
const FormData = require('form-data');

const CLIENT_ID = 'd91b20b13b84a7a'; // Remplacez par votre propre Client ID
const CLIENT_SECRET = 'cad17d1104bec7254b34ff685868d6789480ea15'; // Remplacez par votre propre Client Secret

async function getAccessToken() {
    const form = new FormData();
    form.append('client_id', CLIENT_ID);
    form.append('client_secret', CLIENT_SECRET);
    form.append('grant_type', 'client_credentials');

    try {
        const response = await axios.post('https://api.imgur.com/oauth2/token', form, {
            headers: {
                ...form.getHeaders()
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Erreur lors de l\'obtention du token d\'accès :', error);
        return null;
    }
}

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

            // Obtenez un token d'accès avant de faire la requête
            const accessToken = await getAccessToken();
            if (!accessToken) {
                return message.reply("Failed to get access token.");
            }

            // Téléversez l'image sur Imgur
            const response = await axios.post('https://api.imgur.com/3/image', form, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    ...form.getHeaders()
                }
            });

            if (response.data && response.data.data && response.data.data.link) {
                const imgurLink = response.data.data.link;
                message.reply({ body: `Image uploaded successfully: ${imgurLink}` });
            } else {
                message.reply("Failed to upload the image to Imgur.");
            }
        } catch (error) {
            console.error('Error:', error);
            message.reply(`Error: ${error.message}`);
        }
    }
};
