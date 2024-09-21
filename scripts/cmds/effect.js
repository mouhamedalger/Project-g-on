const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

module.exports = {
  config: {
    name: 'effect',
    version: '1.0.0',
    hasPermission: 0,
    author: 'JISHAN',
    description: 'Apply an effect to an image using the effect API',
    category: 'TOOLS',
    usages: '<effectName>',
    cooldowns: 2,
  },

  onStart: async ({ event, args, message }) => {
    if (event.type !== 'message_reply' || !event.messageReply.attachments[0]) {
      return message.reply('Please reply to a message containing an image to apply the effect.');
    }

    const attachment = event.messageReply.attachments[0];
    const imagePath = __dirname + '/cache/image.png';

    try {
      const response = await axios.get(attachment.url, { responseType: 'arraybuffer' });
      fs.writeFileSync(imagePath, Buffer.from(response.data, 'binary'));

      const formData = new FormData();
      formData.append('image', fs.createReadStream(imagePath));

      // Get the effect name from the user's command (e.g., "!applyEffect thanos")
      
      const effectName = args[0];

      // Make request to ImgBB API to upload the image and get the image URL
      const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
        params: {
          key: '3604c7bc104a2f9dcdf20820cc2ec07a',
        },
      });

      // Extract the image URL from the ImgBB API response
      const imageUrl = imgbbResponse.data.data.url;

      // Make request to the 'jishan10' effect API with the image URL and effect name as query parameters
      const apiEndpoint = `https://web.jishan10.repl.co/api/${effectName}?url=${encodeURIComponent(imageUrl)}`;
      const apiResponse = await axios.get(apiEndpoint, { responseType: 'arraybuffer' });

      // Create a temporary file to save the processed image
      const processedImagePath = __dirname + '/cache/processed_image.png';
      fs.writeFileSync(processedImagePath, Buffer.from(apiResponse.data, 'binary'));

      // Send the processed image back to the user
      await message.reply({
        body: `Image output for the effect "${effectName}"`,
        attachment: fs.createReadStream(processedImagePath),
      });

      // Cleanup temporary files
      fs.unlinkSync(imagePath);
      fs.unlinkSync(processedImagePath);
    } catch (error) {
      console.error(error);
      message.reply(`An error occurred while applying the effect. Please use below effects : circle, distort, fire, glitch, invert, jail, magik, missionpassed, moustache, rip, scary, thanos, tobecontinued, wanted, wasted
                    `);
    }
  },
};
