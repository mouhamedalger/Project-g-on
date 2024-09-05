module.exports.config = {
                name: "اعلام",
         	version: "1.3",
		author: "محمد تانجيرو",
         	countDown: 5,
            	role: 0,
            	description: { ar: "ترسل ضحكات بعض الشخصيات الأسطورية" },
	  	category: "no prefix",
	    	guide: { ar: "{pn}" }
                         };

const fs = require('fs');
const axios = require('axios');
/*const tempImageFilePath = __dirname + "/cache/tempImage.jpg";*/

module.exports.onStart = async function ({ api, event, args }) {
    const questions = [
      { image: "https://i.pinimg.com/originals/6f/a0/39/6fa0398e640e5545d94106c2c42d2ff8.jpg"/*, answer: "العراق"*/ },
      { image: "https://i.pinimg.com/originals/2d/a2/6e/2da26e58efd5f32fe2e33b9654907ab5.gif"}
    ];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    /*const correctAnswer = randomQuestion.answer;*/

    const imageResponse = await axios.get(randomQuestion.image, { responseType: "arraybuffer" });
    fs.writeFileSync(__dirname + "/cache/tempImage.jpg", Buffer.from(imageResponse.data, "binary"));

    const attachment = [fs.createReadStream(__dirname + "/cache/tempImage.jpg")];
    const message = `✨ لأي دولة ينتمي هذا العلم؟ ✨`;

    api.sendMessage({ body: message, attachment }, event.threadID, event.messageID);
};
