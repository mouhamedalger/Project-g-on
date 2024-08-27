const axios = require('axios');
const tinyurl = require('tinyurl');

module.exports = {
	config: {
		name: "4k",
		aliases: ["4k", "remini"],
		version: "1.0",
		author: "𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎",
		countDown: 15,
		role: 0,
		longDescription: "Upscale your image to 4K resolution.",
		category: "image",
		guide: {
			en: "{pn} reply to an image to enhance it."
		}
	},

	onStart: async function ({ message, args, event, api }) {
		const getImageUrl = () => {
			if (event.type === "message_reply") {
				const replyAttachment = event.messageReply.attachments[0];
				if (["photo", "sticker"].includes(replyAttachment?.type)) {
					return replyAttachment.url;
				} else {
					throw new Error("🕶️ | Must reply to an image or sticker.");
				}
			} else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g) || null) {
				return args[0];
			} else {
				throw new Error("⚠️ | Please reply to an image.");
			}
		};

		try {
			const imageUrl = await getImageUrl();
			const shortUrl = await tinyurl.shorten(imageUrl);

			message.reply("⏳ | Enhancing your image, please wait...");

			const response = await axios.get(`https://www.api.vyturex.com/upscale?imageUrl=${shortUrl}`);
			const resultUrl = response.data.resultUrl;

			message.reply({ body: "✔️ | Your image has been enhanced.", attachment: await global.utils.getStreamFromURL(resultUrl) });
		} catch (error) {
			message.reply("❌ | Error: " + error.message);
			// Log error for debugging: console.error(error);
		}
	}
};
