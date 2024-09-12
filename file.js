const fs = require('fs');
const { GoatWrapper } = require('fca-liane-utils');

// Helper function to send a message
const sendMessage = (api, threadID, messageID, message) => {
  api.sendMessage(message, threadID, messageID);
};

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "Mahir Tahsan",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file",
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ args, api, event }) {
    const permission = ["100092500544975"];
    const { senderID, threadID, messageID } = event;

    // Check permissions
    if (!permission.includes(senderID)) {
      return sendMessage(api, threadID, messageID, 
        "✦ 𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎 ✦ 𝐥'𝐞𝐬𝐬𝐞𝐧𝐜𝐞 𝐝𝐮 𝐬𝐨𝐦𝐛𝐫𝐞. ✧ 𝐋𝐞 𝐩𝐨𝐮𝐯𝐨𝐢𝐫 𝐝𝐞 𝑙'𝒐𝒎𝒃𝒓𝒆 𝒏'𝒆𝒔𝒕 𝒑𝒂𝒔 𝒂̀ 𝒍𝒂 𝒑𝒐𝒓𝒕𝒆́𝒆 𝒅𝒆 𝒕𝒐𝒖𝒔. 🤷🏼🤤😏"
      );
    }

    // Extract file name
    const fileName = args[0];
    if (!fileName) {
      return sendMessage(api, threadID, messageID, "Please provide a file name.");
    }

    // Construct file path and check if file exists
    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return sendMessage(api, threadID, messageID, `File not found: ${fileName}.js`);
    }

    // Read and send file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, threadID);
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
