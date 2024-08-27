const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "━━━━━━━━━━━━━━━━\n╔╦══• •✠•☘•✠ • •══╦╗\n★𝐒𝚮𝚫𝐃𝚯𝐖✞𝐆𝚫𝚪𝐃𝚵𝚴★\n╚╩══• •✠•☘•✠ • •══╩╝"; // changing this won't change the GoatBot V2 list cmd, it's just a decoy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "NTKhang", // original author leeza 
    countDown: 0,
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

      msg += `╔╦══• •✠•☘•✠ • •══╦╗\n★𝐒𝚮𝚫𝐃𝚯𝐖✞𝐆𝚫𝚪𝐃𝚵𝚴★\n╚╩══• •✠•☘•✠ • •══╩╝\n━━━━━━━━━━━━━━━━`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n💻 🎯☞${category.toUpperCase()}☜🎯 💻\n`;

          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => `\n🇹🇬✨👀☞🧬${item}🧬`);
            msg += `\n ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += `\n⫷≕≔≕≔๖ۣ•҉✞≕≔≕✞๖ۣ•҉≕≔≕≔⫸`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n𝗖𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆, 𝘁𝗵𝗲 𝗯𝗼𝘁 𝗵𝗮𝘀 ☣${totalCommands} 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀☣ 𝘁𝗵𝗮𝘁 𝗰𝗮𝗻 𝗯𝗲 𝘂𝘀𝗲𝗱\n`;
      msg += `𝗧𝘆𝗽𝗲 ${prefix} 𝗵𝗲𝗹𝗽 𝗰𝗺𝗱𝗡𝗮𝗺𝗲 𝘁𝗼 𝘃𝗶𝗲𝘄 𝘁𝗵𝗲 𝗱𝗲𝘁𝗮𝗶𝗹𝘀 𝗼𝗳 𝘁𝗵𝗮𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱\n`;
      msg += `\n╭──── • 🔵 • ─────╮\n   『𝐀𝐓𝐎𝐌𝐈𝐂✄𝔹𝕆𝕋』\n╰──── • 🔵 • ─────╯`; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.imgur.com/0Lepc52.mp4",
        "https://i.imgur.com/uydAMCE.gif",
        "https://i.imgur.com/QeR5jPr.gif",
        "https://i.imgur.com/WDjk7VW.mp4",
        "https://i.ibb.co/v1ZnCcf/image.jpg",
        "https://i.ibb.co/fdYPcQC/image.jpg",
        "https://i.ibb.co/v33p4FT/image.jpg",
        "https://i.ibb.co/s9NZzbH/image.jpg",
        "https://i.ibb.co/X5XqBJ5/image.jpg",
	"https://i.ibb.co/PFmnqCh/image.jpg",
	"https://i.ibb.co/hK58KMV/image.jpg",
	"https://i.ibb.co/r2W41hL/image.jpg",
	"https://i.ibb.co/Hr0bdy3/image.jpg",
	"https://i.ibb.co/hK58KMV/image.jpg",
	"https://i.ibb.co/7JjQCcJ/image.jpg",
	"https://i.ibb.co/r451ZSL/image.jpg",
	"https://i.ibb.co/smSMgD6/image.jpg",
	// Add more image links as needed
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

        const response = `°•✮•°✞𝐒𝐇𝐀𝐃𝐎𝐖✞°•✮•°
  😎=➪  『${configCommand.name}』
  🤖=➪ 𝙄𝙉𝙁𝙊
  📜=➪ 𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣: 『${longDescription}』
  🗃=➪ 𝙊𝙩𝙝𝙚𝙧 𝙣𝙖𝙢𝙚𝙨: 『${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}』
  👥=➪  𝙊𝙩𝙝𝙚𝙧 𝙣𝙖𝙢𝙚𝙨 𝙞𝙣 𝙮𝙤𝙪𝙧 𝙜𝙧𝙤𝙪𝙥: 𝘿𝙤 𝙣𝙤𝙩 𝙝𝙖𝙫𝙚
  🔢=➪ 𝙑𝙚𝙧𝙨𝙞𝙤𝙣: 『${configCommand.version || "1.0"}』
  🔑=➪  𝙍𝙤𝙡𝙚: 『${roleText}』
  ⏳=➪  𝙏𝙞𝙢𝙚 𝙥𝙚𝙧 𝙘𝙤𝙢𝙢𝙖𝙣𝙙: 『${configCommand.countDown || 1}s』
  ✍=➪  𝘼𝙪𝙩𝙝𝙤𝙧: 『${author}』
  📝=➪ 𝙐𝙨𝙖𝙜𝙚
  📚=➪ 『${usage}』
  💡=➪  𝙉𝙤𝙩𝙚𝙨
  🔧=➪ 𝙏𝙝𝙚 𝙘𝙤𝙣𝙩𝙚𝙣𝙩 𝙞𝙣𝙨𝙞𝙙𝙚 <𝙓𝙓𝙓𝙓𝙓> 𝙘𝙖𝙣 𝙗𝙚 𝙘𝙝𝙖𝙣𝙜𝙚𝙙
🔄=➪ 𝙏𝙝𝙚 𝙘𝙤𝙣𝙩𝙚𝙣𝙩 𝙞𝙣𝙨𝙞𝙙𝙚 ${prefix}𝙘𝙢𝙙 𝙘𝙖𝙣 𝙗𝙚 𝙘𝙝𝙖𝙣𝙜𝙚𝙙
  🔧=➪ 𝙏𝙝𝙚 𝙘𝙤𝙣𝙩𝙚𝙣𝙩 𝙞𝙣𝙨𝙞𝙙𝙚 ${prefix}𝙝𝙚𝙡𝙥 𝙞𝙨 𝙙𝙚𝙛𝙞𝙣𝙞𝙩𝙚𝙡𝙮 𝙙𝙚𝙥𝙚𝙣𝙙𝙚𝙣𝙩 𝙤𝙣 𝙭𝙭𝙭𝙭𝙭 𝙖𝙨 𝙮𝙤𝙪 𝙝𝙖𝙫𝙚 𝙛𝙪𝙡𝙡 𝙖𝙘𝙘𝙚𝙨𝙨.
  🗓=➪ 𝙏𝙝𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙬𝙞𝙡𝙡 𝙩𝙖𝙠𝙚 1-2𝙢𝙞𝙣 𝙩𝙤 𝙛𝙪𝙡𝙡𝙮 𝙧𝙪𝙣
  🔄=➪ 𝙏𝙝𝙞𝙨 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙞𝙨 𝙘𝙤𝙥𝙮𝙧𝙞𝙜𝙝𝙩 © 2024
  
°•✮•°✞𝐒𝐇𝐀𝐃𝐎𝐖✞°•✮•°
`;

        await message.reply({
          body: response,
        });
      }
    }
  },
};

function roleTextToString(role) {
  switch (role) {
    case 0:
      return "User";
    case 1:
      return "Moderator";
    case 2:
      return "Admin";
    case 3:
      return "Super Admin";
    default:
      return "Unknown";
  }
	      }
