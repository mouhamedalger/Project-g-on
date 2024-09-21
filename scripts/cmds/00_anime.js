const axios = require('axios');
const request = require('request');
const fs = require('fs');

module.exports = {
  config: {
    name: "anime",
    version: "1.0.0",
    hasPermssion: 0,
    author: "JISHAN",
    description: "Perform an anime action",
    category: "anime",
    usages: "anime [Action]",
    cooldowns: 5,
  },

  onStart: async ({ api, event, args }) => {
    try {
      const out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
      if (args.length < 1) return out("Please provide a valid action.");

      const validActions = [
        "angry", "anime", "bite", "bored", "bread", "chocolate", "cookie", "cuddle",
        "dance", "drunk", "happy", "kill", "kiss", "laugh", "lick", "lonely", "pat",
        "poke", "pregnant", "punch", "run", "satouselfies", "slap", "sleep", "spank",
        "spit", "steal", "tickle", "nomm"
      ];
      const command = args[0].toLowerCase(); // Get the action from the input

      if (!validActions.includes(command)) {
  const additionalText = "example : -anime cuddle";
  return out("Please enter a valid action from the following:\n\n" + validActions.join(",  ") + "\n\n" + additionalText);
}

      const apiEndpoint = `https://apiservice1.kisara.app/satou/api/endpoint/${command}`;
      const res = await axios.get(apiEndpoint);
      const ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
      const gifUrl = res.data.url;

      const callback = function () {
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        api.sendMessage({
          body: `*Performed ${command}!*`,
          attachment: fs.createReadStream(__dirname + `/cache/${command}.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${command}.${ext}`), event.messageID);
      };

      request(gifUrl).pipe(fs.createWriteStream(__dirname + `/cache/${command}.${ext}`)).on("close", callback);
    } catch (err) {
      console.error(err);
      api.sendMessage("Failed to generate the GIF. Make sure you've provided a valid action!", event.threadID, event.messageID);
      api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
    }
  }
};
