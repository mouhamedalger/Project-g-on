module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Loid Butter",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "Set coins and experience points for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["100092500544975"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("✦ 𝑻𝒖 𝒏'𝒆𝒔 𝒒𝒖𝒆 𝒖𝒏𝒆 𝒐𝒎𝒃𝒓𝒆 𝒅𝒂𝒏𝒔 𝒍𝒆 𝒗𝒆́𝒓𝒊𝒕𝒂𝒃𝒍𝒆 𝑹𝒐𝒚𝒂𝒖𝒎𝒆 ✧ 𝑺𝒆𝒖𝒍 𝑴𝒐𝒏 𝑺𝒆𝒊𝒈𝒏𝒆𝒖𝒓 𝒅𝒆𝒕𝒊𝒆𝒏𝒕 𝒍'𝒂𝒏𝒕𝒊𝒒𝒖𝒆 𝒄𝒍𝒆́ 𝒅𝒆 𝒄𝒆 𝒑𝒐𝒖𝒗𝒐𝒊𝒓 ✧ 𝑹𝒆́𝒕𝒓𝒂𝒄𝒕𝒆-𝒕𝒐𝒊 𝒐𝒖 𝒑𝒆́𝒓𝒊𝒔 𝒅𝒂𝒏𝒔 𝒍'𝒂𝒃𝒊̂𝒎𝒆 𝒅𝒆𝒔 𝑻𝒆́𝒏𝒆̀𝒃𝒓𝒆𝒔. 🐤", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("Invalid command arguments. Usage: set [query] [amount]", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`Set experience points to ${amount} for ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`Set coins to ${amount} for ${name}.`, threadID);
    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
