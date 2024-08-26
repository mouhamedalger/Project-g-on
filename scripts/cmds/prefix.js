module.exports = {
 config: {
	 name: "prefix",
	 version: "1.0",
	 author: "Tokodori_Frtiz",//remodified by cliff
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "system",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `『☣𝐏𝐑𝐄𝐅𝐈𝐗💀𝐒𝐇𝐀𝐃𝐎𝐖☣』:↠¥↞\n╔━━━━≛✞۝✞≛━━━━━╗\n㋰𝐀𝐓𝐎𝐌𝐈𝐂×͜×𝐒𝐘𝐒𝐓𝐄𝐌𝐄㋰:⇨¥⇦\n╚━━━━≛✞۝✞≛━━━━━╝\n☣𝑀𝑌 𝐶𝑅𝐸𝐴𝑇𝑂𝑅☣\n╔━≕≔≕≔✞≛❂≛✞≕≔≕≔━╗\n๖ۣ•҉✞𝐂𝐢𝐝×͜×𝐊𝐚𝐠𝐞𝐧𝐨✞๖ۣ•҉\n╚━≕≔≕≔✞≛❂≛✞≕≔≕≔━╝\n🥲✨『𝗧𝗮𝗽𝗲 ¥𝗵𝗲𝗹𝗽 𝗽𝗼𝘂𝗿 𝗮𝘃𝗼𝗶𝗿 𝗹𝗮 𝗹𝗶𝘀𝘁𝗲 𝗱𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀✨🥲』`,
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/TcGjWrp/image.gif")
 });
 }
 }
}
