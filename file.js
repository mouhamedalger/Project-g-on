const fs = require('fs');
const { GoatWrapper } = require('fca-liane-utils');

module.exports = {
	config: {
		name: "file",
		version: "1.0",
		author: "Mahir Tahsan",
		countDown: 5,
		role: 0,
		shortDescription: "Send bot script",
		longDescription: "Send bot specified file ",
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide: "{pn} file name. Ex: .{pn} filename"
	},

	onStart: async function ({ message, args, api, event }) {
		const permission = ["100092500544975"];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage("𝐒𝐞𝐮𝐥 ✦ 𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎 ✦ 𝐝𝐞𝐭𝐢𝐞𝐧𝐭 𝐥'𝐞𝐬𝐬𝐞𝐧𝐜𝐞 𝐝𝐮 𝐬𝐨𝐦𝐛𝐫𝐞 ✧ 𝐥𝐞 𝐬𝐞𝐜𝐫𝐞𝐭 𝐢𝐧𝐢𝐭𝐢𝐚𝐭𝐢𝐪𝐮𝐞 𝐧𝐞 𝐬𝐞 𝐫𝐞́𝐯𝐞̀𝐥𝐞 𝐪𝐮'𝐚𝐮𝐱 𝐞́𝐥𝐮𝐬 ✦ 𝐜𝐞𝐮𝐱 𝐪𝐮𝐢 𝐯𝐨𝐲𝐚𝐠𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥'𝐨𝐦𝐛𝐫𝐞 ✧ 𝐚𝐯𝐞𝐜 𝐥'𝐚𝐫𝐭 𝐝𝐞 𝐥𝐚 𝐦𝐲𝐬𝐭𝐢𝐪𝐮𝐞 ✧ 𝐋𝐚 𝐦𝐞́𝐝𝐢𝐨𝐜𝐫𝐢𝐭𝐞́ 𝐧'𝐞𝐬𝐭 𝐪𝐮𝐮'𝐮𝐧 𝐦𝐚𝐧𝐭𝐞𝐚𝐮 ✧ 𝐞𝐭 𝐥𝐞𝐬 𝐯𝐞́𝐫𝐢𝐭𝐚𝐛𝐥𝐞𝐬 𝐩𝐨𝐮𝐯𝐨𝐢𝐫𝐬 𝐬𝐞 𝐝𝐢𝐬𝐬𝐢𝐦𝐮𝐥𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐭𝐞́𝐧𝐞̀𝐛𝐫𝐞𝐬. 𝑳𝒆 𝒑𝒐𝒖𝒗𝒐𝒊𝒓 𝒅𝒆 𝒍'𝒐𝒎𝒃𝒓𝒆 𝒏'𝒆𝒔𝒕 𝒑𝒂𝒔 𝒂̀ 𝒍𝒂 𝒑𝒐𝒓𝒕𝒆́𝒆 𝒅𝒆 𝒕𝒐𝒖𝒔... 𝒑𝒂𝒔𝒔𝒆 𝒕𝒐𝒏 𝒄𝒉𝒆𝒎𝒊𝒏 𝒐𝒖 𝒑𝒆𝒓𝒊𝒔 𝒅𝒂𝒏𝒔 𝒍𝒂 𝒑𝒆́𝒏𝒖𝒎𝒃𝒓𝒆. 🐤", event.threadID, event.messageID);
		}

		const fileName = args[0];
		if (!fileName) {
			return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
		}

		const filePath = __dirname + `/${fileName}.js`;
		if (!fs.existsSync(filePath)) {
			return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
		}

		const fileContent = fs.readFileSync(filePath, 'utf8');
		api.sendMessage({ body: fileContent }, event.threadID);
	}
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
