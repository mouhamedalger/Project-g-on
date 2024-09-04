const fs = require("fs");
module.exports.config = {
                name: "ضحكات",
		version: "1.3",
		author: "محمد تانجيرو",
		countDown: 5,
		role: 0,
		description: {
			ar: "ترسل ضحكات بعض الشخصيات الأسطورية"
		},
		category: "no prefix",
		guide: {
			ar: "   {pn} [اسم الشخصية]"
		}
};

module.exports.onChat = function({ message, api, event, client, envGlobal, __GLOBAL }) {
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();

  if(react.includes("ضحكة لايت") || react.includes("ضحكة كيرا")) {
    var sad = {body: "ضحكة أسطورية 🫣🔥",
    attachment: fs.createReadStream(__dirname + "/Laughs/kira.mp3")}
    api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
        };
  
  if(react.includes("ضحكة دوفلامينغو") || react.includes("ضحكة دوفي")) {
    var sad = {body: "ضحكة أسطورية 🫣🔥",
    attachment: fs.createReadStream(__dirname + "/Laughs/dofi.mp3")}
    api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
        };

  if(react.includes("ضحكة تيتش") || react.includes("ضحكة اللحية السوداء")) {
    var sad = {body: "ضحكة أسطورية 🫣🔥",
    attachment: fs.createReadStream(__dirname + "/Laughs/titch.mp3")}
    api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
        };
  
  if(react.includes("ضحكة كروكودايل") || react.includes("ضحكة كروكو")) {
    var sad = {body: "ضحكة أسطورية 🫣🔥",
    attachment: fs.createReadStream(__dirname + "/Laughs/croco.mp3")}
    api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
        };

  if(react.includes("ضحكة بروك")) {
    var sad = {body: "ضحكة أسطورية 🫣🔥",
    attachment: fs.createReadStream(`${__dirname}/Laughs/brook.mp3`)}
    api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
        };

  if(react.includes("ضحكة سيزار")) {
    var sad = {body: "ضحكة أسطورية 🫣🔥",
    attachment: fs.createReadStream(`${__dirname}/Laughs/caesar.mp3`)}
    api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
        };

  if(react.includes("ضحكة مادارا")) {
    var sad = {body: "ضحكة أسطورية 🫣🔥",
    attachment: fs.createReadStream(__dirname + "/Laughs/madara.mp3")}
    api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
        };
}

  module.exports.onStart = function({ message, api, event, client, envGlobal, __GLOBAL }) {}
