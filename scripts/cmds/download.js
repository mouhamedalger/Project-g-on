const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "download",
    version: "1.0",
    author: "JISHAN76",
    countDown: 10,
    role: 0,
    shortDescription: "Download content",
    longDescription: "",
    category: "utility",
    guide: {
      en: "{p}{n} [url]",
    }
  },

  onStart: async function ({ message, args }) {
    if (!args || args.length < 1) {
      return message.reply(`Please provide a URL to download.`);
    }

    const url = args[0];
    const apiUrl = `https://www.nguyenmanh.name.vn/api/autolink?url=${encodeURIComponent(url)}&apikey=APyDXmib`;

    try {
      const response = await axios.get(apiUrl);

      const { video } = response.data.result;

      // Download video
      const videoHdFileName = video.hd.substring(video.hd.lastIndexOf('/') + 1);
      const videoHdFilePath = `./downloads/${videoHdFileName}`;
      await downloadFile(video.hd, videoHdFilePath);

      return message.reply(`Download completed.\nVideo (HD): ${videoHdFilePath}`);
    } catch (error) {
      console.error(error);
      return message.reply("An error occurred while downloading the file. Please try again later.");
    }
  }
};

async function downloadFile(url, filePath) {
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    method: 'get',
    url: url,
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
