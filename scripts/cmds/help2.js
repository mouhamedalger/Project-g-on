const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🐐 | GoatBot V2 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "pharouk", // original author Kshitiz 
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `》[𝐀𝐓𝐎𝐌𝐈𝐂🔸-𝗖𝗠𝗗𝙨]\n____________________________\n `; // 𝙏𝙐 𝙋𝙀𝙐𝙓 𝙇'𝙐𝙏𝙄𝙇𝙄𝙎𝙀𝙍

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += ` \n〉[💢}---「${category.toUpperCase()}====•`;
const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => `\n🔸﹝${item}﹞`);
            msg += ` ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += ``;
        }
      });

      const totalCommands = commands.size;
      msg += `\n..........................\n💢𝗧𝗢𝗧𝗔𝗟 𝗖𝗺𝗱 [${totalCommands}🎧]\n》𝙲𝚁𝙴𝙰𝚃𝙾𝚁:\𝙣☛๖ۣ•҉✞𝐂𝐈𝐃✄𝐊𝐀𝐆𝐄𝐍𝐎✞๖ۣ•҉\n𝐁𝐎𝐓 𝐂𝐑𝐄𝐄𝐑 𝐏𝐀𝐑 ✪𝐂𝐈𝐃✪ 𝐏𝐎𝐔𝐓 𝐂𝐄𝐔𝐗 𝐐𝐔𝐈 𝐕𝐄𝐔𝐋𝐄𝐍𝐓 𝐌𝐄 𝐂𝐎𝐍𝐓𝐀𝐂𝐓𝐄𝐑 𝐔𝐓𝐈𝐋𝐈𝐒𝐄𝐙 𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 [¥callad]\n▌│(ˆ⌣ˆ)♉`;
      msg += ``;
      msg += ``; // 𝐁𝐎𝐅𝐅 𝐕𝐎𝐔𝐒 𝐏𝐎𝐔𝐕𝐄𝐙 𝐌𝐄 𝐃𝐄𝐌𝐀𝐍𝐃𝐄𝐑 𝐓𝐎𝐔𝐓 𝐂𝐄 𝐐𝐔𝐄 𝐕𝐎𝐔𝐒 𝐕𝐎𝐔𝐋𝐄𝐙 🐬

      const helpListImages = [
        "https://i.ibb.co/vqcfHB5/image.jpg",
        "https://i.ibb.co/j8cYhF4/image.jpg",
        "https://i.ibb.co/fxJn3F8/image.jpg",
	"https://i.ibb.co/xXVZjr1/image.jpg",
	"https://i.ibb.co/0GCdjHr/image.jpg",
	"https://i.ibb.co/qpg1H12/image.jpg",
	"https://i.ibb.co/RYyPpYW/image.jpg",
	"https://i.ibb.co/CBLq4LR/image.jpg",
	"https://i.ibb.co/GCwFY63/image.jpg",
	"https://i.ibb.co/m871Cwg/image.jpg",
	"https://i.ibb.co/j8cTZkB/image.jpg",
	"https://i.ibb.co/4VBzKj6/image.jpg",
	"https://i.ibb.co/9qPq6wS/image.jpg",
        

      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `🔸𝗡𝗔𝗠𝗘🔹\n__________________________________\n
 〉[ ${configCommand.name}]\n
🔸𝗜𝗡𝗙𝗢🔹\n____________________________________\n
   〉[𝘥𝘦𝘴𝘤𝘳𝘪𝘱𝘵𝘪𝘰𝘯]:\n▶︎${longDescription}\n
   〉🔸[𝘖𝘵𝘩𝘦𝘳-𝘯𝘢𝘮𝘦𝘴]:\n▶︎${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"} Other names in your group: Do not have\n
   〉🔹[𝘝𝘦𝘳𝘴𝘪𝘰𝘯]:\n▶︎${configCommand.version || "1.0"}\n
   〉🔸[𝘙𝘰𝘭𝘦]:\n▶︎${roleText}\n
   〉🔹𝘛𝘪𝘮𝘦 𝘱𝘦𝘳 𝘤𝘰𝘮𝘮𝘢𝘯𝘥:\n ▶︎${configCommand.countDown || 1}s
   〉🔸[𝘈𝘶𝘵𝘩𝘰𝘳]:\n▶︎${author}\n
🔸𝗨𝗦𝗔𝗚𝗘🔹\n_______________________________________\n
▶︎ ${usage}\n_______________________________________\n🔸𝘽𝙔 𝐂𝐈𝐃×͜× 🔹`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
