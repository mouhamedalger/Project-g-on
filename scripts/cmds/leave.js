const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports = {
	config: {
		name: "leave",
		aliases: ["out"],
		version: "1.0",
		author: "Danny",
		countDown: 5,
		role: 2,
		shortDescription: "bot will leave gc",
		longDescription: "",
		category: "admin",
		guide: {
			vi: "{pn} [tid,blank]",
			en: "{pn} [tid,blank]"
		}
	},

	onStart: async function ({ api,event,args, message }) {
        const permission = ["100092500544975"];
        if (!permission.includes(event.senderID)) {
            api.sendMessage("❌ | 🕵️‍♂️🌑 𝑆𝑒𝑢𝑙 🌟  ▒▓█►─═𝐂𝐢𝐝✄𝐊𝐚𝐠𝐞𝐧𝐨═─◄█▓▒  𝑢𝑡𝑖𝑙𝑖𝑠𝑒 𝑙𝑎 𝑐𝑜𝑚𝑚𝑎𝑛𝒹𝑒  🌟🕵️‍♂️.", event.threadID, event.messageID);
            return;
        }
 var id;
 if (!args.join(" ")) {
 id = event.threadID;
 } else {
 id = parseInt(args.join(" "));
 }
 return api.sendMessage('goodbye guys', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
		}
	};
