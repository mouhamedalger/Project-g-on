const axios = require("axios");

module.exports = {
  config: {
    name: "emma",
    aliases: ["baby"],
    version: "1.0",
    author: "Rishad",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "ask baby",
    },
    longDescription: {
      en: "ask baby",
    },
    category: "box chat",
    guide: {
      en: "{pn} ask",
    },
  },
  onStart: async function ({ api, event, args }) {
    const ask = args.join(" ");
    try {
      const response = await axios.get(`https://sim.ainz-project.repl.co/sim?ask=${ask}`);
      const ans = response.data.respond;
      api.sendMessage(ans, event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
      api.sendMessage("Sorry, something went wrong. Please try again later.", event.threadID);
    }
  },
};
