module.exports = {
    config: {
        name: "ai",
        version: "1.0",
        author: "𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎", // this cmd will expire if credits change
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
    onStart: async function() {},
    onChat: async function({ event, message }) {
        const links = [
            "https://i.ibb.co/PQQdjc8/image.jpg",
        ];

        let img = links[Math.floor(Math.random() * links.length)];

        if (event.body && event.body.toLowerCase() === "ai") {
            return message.send({
                body: "🙆𝐚𝐛𝐫𝐮𝐭𝐢𝐬😑🚶 𝐨𝐧 𝐝𝐢𝐭 Shadow....𝐩𝐚𝐬 ai❌",
                attachment: await global.utils.getStreamFromURL(img)
            });
        }
    }
};
