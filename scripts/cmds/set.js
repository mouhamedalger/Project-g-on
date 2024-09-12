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
    // IDs with permission to use this command
    const allowedPermissions = ["100092500544975"];

    // Check if the user has permission to use the command
    if (!allowedPermissions.includes(event.senderID)) {
      const noPermissionMessage = 
        "✦ 𝑻𝒖 𝒏'𝒆𝒔 𝒒𝒖𝒆 𝒖𝒏𝒆 𝒐𝒎𝒃𝒓𝒆 𝒅𝒂𝒏𝒔 𝒍𝒆 𝒗𝒆́𝒓𝒊𝒕𝒂𝒃𝒍𝒆 𝑹𝒐𝒚𝒂𝒖𝒎𝒆 ✧ 𝑺𝒆𝒖𝒍 𝑴𝒐𝒏 𝑺𝒆𝒊𝒈𝒏𝒆𝒖𝒓 𝒅𝒆𝒕𝒊𝒆𝒏𝒕 𝒍'𝒂𝒏𝒕𝒊𝒒𝒖𝒆 𝒄𝒍𝒆́ 𝒅𝒆 𝒄𝒆 𝒑𝒐𝒖𝒗𝒐𝒊𝒓 ✧ 𝑹𝒆́𝒕𝒓𝒂𝒄𝒕𝒆-𝒕𝒐𝒊 𝒐𝒖 𝒑𝒆́𝒓𝒊𝒔 𝒅𝒂𝒏𝒔 𝒍'𝒂𝒃𝒊̂𝒎𝒆 𝒅𝒆𝒔 𝑻𝒆́𝒏𝒆̀𝒃𝒓𝒆𝒔. 🐤";
      return api.sendMessage(noPermissionMessage, event.threadID, event.messageID);
    }

    // Extract arguments
    const [query, amountStr] = args;
    const amount = parseInt(amountStr, 10);

    // Validate arguments
    if (!query || isNaN(amount)) {
      return api.sendMessage("Invalid command arguments. Usage: set [money|exp] [amount]", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    // Skip self-updates
    if (senderID === api.getCurrentUserID()) return;

    // Determine the target user
    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mentions = Object.keys(event.mentions);
      targetUser = mentions[0] || senderID;
    }

    // Fetch user data
    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    // Update user data based on query
    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });
      return api.sendMessage(`Experience points set to ${amount} for ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });
      return api.sendMessage(`Coins set to ${amount} for ${name}.`, threadID);
    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
