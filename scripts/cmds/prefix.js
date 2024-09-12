module.exports = {
  config: {
    name: "prefix",
    version: "1.1",
    author: "𝐜𝐢𝐝",
    countDown: 5,
    role: 0,
    shortDescription: "Display bot prefix",
    longDescription: "Shows the current command prefix of the bot.",
    category: "system",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      return message.reply({
        body: `🔥 ♫𝐏𝐑𝐄𝐅𝐈𝐗♫ 🔥\n
╔═════≛✬✬≛═════╗\n
𝐁𝐎𝐓 𝑃𝑅𝐸𝑓𝐼𝑆: ¥\n
╚═════≛✬✬≛═════╝\n
🛠 *𝐂𝐑𝐄𝐀𝐓𝐎𝐑* 🛠\n
╔═════✹✹✹═════╗\n
★𝑪𝑰𝑫×͜×𝐊𝐀𝐆𝐄𝐍𝐎✔\n
╚═════✹✹✹═════╝\n
💡 Tape "help" pour la liste des commandes 💡`,
        attachment: await global.utils.getStreamFromURL("https://i.ibb.co/PQQdjc8/image.jpg")
      });
    }
  }
};
