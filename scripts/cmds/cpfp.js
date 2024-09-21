const axios = require('axios');

module.exports = {
  config: {
    name: 'pairdp',
    version: '1.0.0',
    hasPermission: 0,
    author: 'JISHAN76',
    description: 'Fetch and send images from the provided API',
    category: 'api',
    usages: '',
    cooldowns: 5,
    dependencies: {},
  },

  onStart: async ({ api, event }) => {
    try {
      // Fetch data from the API
      const apiUrl = 'https://www.jishanxyz.repl.co/api/pair';
      const res = await axios.get(apiUrl);
      const data = res.data;

      // Check if data is available
      if (!data || typeof data !== 'object' || !data.male || !data.female) {
        api.sendMessage('No valid data available from the API.', event.threadID);
        return;
      }

      // Send images as attachments
      const maleImageStream = await axios.get(data.male, { responseType: 'stream' });
      const femaleImageStream = await axios.get(data.female, { responseType: 'stream' });

      await api.sendMessage(
        {
          attachment: [
       
            femaleImageStream.data,
maleImageStream.data,
          ],
        },
        event.threadID
      );
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while fetching data from the API.', event.threadID);
    }
  },
};
