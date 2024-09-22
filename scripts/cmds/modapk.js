const fs = require("fs-extra");
const fetch = require("node-fetch");
const path = require("path");

module.exports = {
  config: {
    name: "modapk",
    version: "1.0",
    author: "JISHAN76",
    countDown: 2,
    role: 0,
    shortDescription: {
      en: "Get modded APK information",
    },
    longDescription: {
      en: "Fetches information about modded APKs",
    },
    category: "entertainment",
    guide: {
      en: "-modapk [input]",
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      const input = args.join(" ");
      const apiUrl = `https://mfarels.my.id/api/happymod?q=${encodeURIComponent(input)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      const { res } = data;
      const output = res.map(item => ({
        title: item.title,
        link: item.link,
        thumb: item.thumb,
      }));

      const messages = [];
      const tmpDir = path.join(__dirname, "tmp");
      await fs.ensureDir(tmpDir);

      for (const item of output) {
        const attachmentPath = path.join(tmpDir, path.basename(item.thumb));
        const thumbResponse = await fetch(item.thumb);
        const buffer = await thumbResponse.buffer();
        await fs.writeFile(attachmentPath, buffer);

        const message = {
          attachment: fs.createReadStream(attachmentPath),
          body: `Title: ${item.title}\nLink: ${item.link}`,
        };
        messages.push(message);
      }

      await api.sendMessage2(messages, event.threadID);

      // Cleanup: remove temporary attachment files
      await fs.remove(tmpDir);

    } catch (error) {
      console.error(error);
    }
  },
};
