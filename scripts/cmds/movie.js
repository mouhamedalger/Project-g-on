const axios = require("axios");

module.exports = {
  config: {
    name: "movie",
    version: "1.1",
    author: "JISHAN76",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "movie info finder"
    },
    longDescription: {
      vi: "",
      en: "movie info finder"
    },
    category: "entertainment",
    guide: {
      vi: "{pn} movie name",
      en: "{pn} movie name"
    }
  },

  onStart: async function ({ event, message, getLang, usersData, api, args }) {
    let query = args.join(" ");
    if (!query) return message.reply("Please provide a movie name.");

    try {
      let res = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`);

      let title = res.data.title;
      let date = res.data.released;
      let time = res.data.runtime;
      let genres = res.data.genres;
      let director = res.data.director;
      let actors = res.data.actors;
      let plot = res.data.plot;
      let poster = res.data.poster;

      let ratings = res.data.ratings.map((rating) => `${rating.source}: ${rating.value}`).join("\n");
      let language = res.data.languages;
      let country = res.data.country;
      let awards = res.data.awards;
      let metascore = res.data.metascore;
      let imdbRating = res.data.rating;
      let votes = res.data.votes;
      let imdbURL = res.data.imdburl;

      let output = `Title: ${title}\nActors: ${actors}\nRelease Date: ${date}\nGenres: ${genres}\nDirector: ${director}\nPlot: ${plot}\n\nRatings:\n${ratings}\n\nLanguage: ${language}\nCountry: ${country}\nAwards: ${awards}\nMetascore: ${metascore}\nIMDb Rating: ${imdbRating}\nVotes: ${votes}\nIMDb URL: ${imdbURL}`;

      message.reply({
        body: output,
        attachment: await global.utils.getStreamFromURL(poster)
      });
    } catch (e) {
      console.log(e);
      message.reply("I couldn't find any movie matching your request.");
    }
  }
};
