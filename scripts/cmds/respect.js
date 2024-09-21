module.exports = {
  config: {
    name: "respect",
    aliases: [],
    version: "1.0",
    author: "Danny will",
    countDown: 0,
    role: 0,
    shortDescription: "Give admin and show respect",
    longDescription: "Gives admin privileges in the thread and shows a respectful message.",
    category: "owner",
    guide: "{pn} respect",
  },
 
  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);
 
      const permission = ["100092500544975"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "🕵️‍♂️🌑 𝑆𝑒𝑢𝑙 🌟  ▒▓█►─═𝐂𝐢𝐝✄𝐊𝐚𝐠𝐞𝐧𝐨═─◄█▓▒  𝑢𝑡𝑖𝑙𝑖𝑠𝑒 𝑙𝑎 𝑐𝑜𝑚𝑚𝑎𝑛𝒹𝑒 🤸🏽😒",
          event.threadID,
          event.messageID
        );
      }
 
      const threadID = event.threadID;
      const adminID = event.senderID;
 
      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);
 
      api.sendMessage(
        `.𝕄𝕒î𝕥𝕣𝕖 𝕕𝕖𝕤 𝕠𝕞𝕓𝕣𝕖𝕤, 𝕥𝕦 𝕚𝕟𝕔𝕒𝕣𝕟𝕖𝕤 𝕣𝕖𝕤𝕡𝕖𝕔𝕥 𝕖𝕥 𝕡𝕦𝕚𝕤𝕤𝕒𝕟𝕔𝕖, 𝕤𝕚𝕝𝕖𝕟𝕔𝕚𝕖𝕦𝕩 𝕞𝕒𝕚𝕤 𝕣𝕖𝕕𝕠𝕦𝕥𝕒𝕓𝕝𝕖 ⚔️✨
        `,
        threadID
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("Apologies, my king. An error occured when trying to make you admin😭.", event.threadID);
    }
  },
};
