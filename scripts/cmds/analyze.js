const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const FormData = require('form-data');

const analyzeImageUrl = 'http://brdask.omgapi.repl.co/analyze?image=';

module.exports = {
  config: {
    name: 'analyze',
    version: '1.0.0',
    hasPermission: 0,
    author: 'JISHAN',
    description: 'analyze image',
    category: 'TOOLS',
    usages: '',
    cooldowns: 2,
  },

  onStart: async ({ api, event, message, args }) => {
  if (event.type !== 'message_reply' || !event.messageReply.attachments[0]) {
    return message.reply('Please reply to a message containing an image to upload.');
  }

  const attachment = event.messageReply.attachments[0];
  const imagePath = __dirname + '/cache/image.png';

  try {
    const response = await axios.get(attachment.url, { responseType: 'arraybuffer' });
    fs.writeFileSync(imagePath, Buffer.from(response.data, 'binary'));

    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));

    const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        ...formData.getHeaders(),
      },
      params: {
        key: '3604c7bc104a2f9dcdf20820cc2ec07a',
      },
    });

    const imageUrl = imgbbResponse.data.data.url;

    // Replace placeholders in the API endpoint with actual values from args
    const analyzeEndpoint = `https://brdask.omgapi.repl.co/analyze?url=${encodeURIComponent(imageUrl)}&input=${encodeURIComponent(args)}`;

    // Making a request to the updated API endpoint for image analysis
    const apiResponse = await axios.get(analyzeEndpoint);
    const apiData = apiResponse.data;

    // Extract the content from the API response
    const apiContent = apiData.result.content;

    // Reply with the image URL and the analysis content
    await message.reply({
      body: `Analysis:\n${apiContent}`,
      attachment: fs.createReadStream(imagePath),
    });

    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while processing the image.');
  }
},
};
