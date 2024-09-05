module.exports.config = {
                name: "اماناي",
         	version: "1.3",
		author: "محمد تانجيرو",
         	countDown: 3,
            	role: 0,
            	description: { ar: "إرسال صور أماناي من أنمي جوجوتسو كايسن" },
	  	category: "pictures",
	    	guide: { ar: "{pn}" }
                         };

const fs = require('fs');
const axios = require('axios');

module.exports.onStart = async function ({ api, event, args }) {
    const pictures = [
      { image: "https://i.imgur.com/cuMzlKg.jpg"},
      { image: "https://i.imgur.com/2f52Onh.jpg"},
      { image: "https://i.imgur.com/B9zE4DA.jpg"},
      { image: "https://i.imgur.com/EZa7R9C.jpg"},
      { image: "https://i.imgur.com/j5FfpWE.jpg"},
      { image: "https://i.imgur.com/Wd3456M.jpg"},
/*      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""},
      { image: ""}, */   
    ];

    const randomimage = pictures[Math.floor(Math.random() * pictures.length)];
    const image = await axios.get(randomimage.image, { responseType: "arraybuffer" });
    fs.writeFileSync(__dirname + "/cache/amanai.jpg", Buffer.from(image.data, "binary"));

    const attachment = [fs.createReadStream(__dirname + "/cache/amanai.jpg")];
    const message = `✨        صور أماناي        💙\nمن أنمي جوجوتسو كايسن✨\n    🌹 عدد الصور : ${pictures.length} 🌹`;
    api.sendMessage({ body: message, attachment }, event.threadID, event.messageID);
};
