const fs = require("fs");
module.exports.config = {
                name: "ردودصوتية",
	            	version: "1.3",
            		author: "محمد تانجيرو",
            		countDown: 5,
            		role: 0,
	            	description: { ar: "ردود مبرمجة مصحوبة بملفات صوثية" },
	            	category: "no prefix",
	            	guide: { ar: "الكلمات المبرمجة" }
                         };

module.exports.onChat = function({ message, api, event, client, envGlobal, __GLOBAL }) {
  var { threadID, messageID } = event;
  let mhmd = event.body;

  if (mhmd.startsWith ("أكاني ") || mhmd.endsWith(" أكاني") || mhmd.includes(" أكاني ") || mhmd.toString() == "أكاني" || mhmd.startsWith ("اكاني ") || mhmd.endsWith(" اكاني") || mhmd.includes(" اكاني ") || mhmd.toString() == "اكاني") {
    var arama = {body: "🌹 أرا أرا، أكاني في الخدمة",
    attachment: fs.createReadStream(`${__dirname}/Laughs/arama.mp3`)}
    api.sendMessage(arama, threadID, messageID);
    //api.setMessageReaction("", event.messageID, (err) => {}, true)
        };
}

  module.exports.onStart = function({ message, api, event, client, envGlobal, __GLOBAL }) {}




















 {
    return api.sendMessage({"", attachment: fs.createReadStream(`${__dirname}/Laughs/arama.mp3`)},
event.threadID,event.messageID)};
