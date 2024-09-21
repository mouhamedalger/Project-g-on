const axios = require('axios');
const request = require('request');
const fs = require("fs");

module.exports = {
  config: {
    name: "hen",
    version: "1.0.0",
    hasPermission: 0,
    credits: "TakiUWU",
    description: "",
    commandCategory: "nsfw",
    usages: "",
    cooldowns: 2
  },

  onStart: async ({ api, event }) => {
    axios.get('http://api.nekos.fun:8080/api/hentai').then(res => {
      let ext = res.data.image.substring(res.data.image.lastIndexOf(".") + 1);
      let callback = function () {
        api.sendMessage({
          attachment: fs.createReadStream(__dirname + `/cache/hen.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/hen.${ext}`), event.messageID);
      };
      request(res.data.image).pipe(fs.createWriteStream(__dirname + `/cache/hen.${ext}`)).on("close", callback);
    });
  }
};
