const { Prodia } = require("prodia.js");

const { generateImageSDXL, wait } = Prodia("eff93786-bbde-4b97-bbd2-681f338de43e");



module.exports = {

    config: {

        name: "create",

        version: "1.0",

        author: "JISHAN",

        shortDescription: "Generate an image with Prodia",

        longDescription: "Generates an image based on a prompt using the Prodia AI model.",

        category: "image",

        guide: "{pn} prodia <prompt>"

    },



    onStart: async function ({ message, args }) {

        // Get the prompt from the command arguments

        const prompt = args.join(" ").trim();

        if (!prompt) {

            return message.reply("🚫 Please provide a prompt for the image generation.");

        }



        try {

            // Generate the image based on the provided prompt

            const result = await generateImage(prompt);



            // Send the image URL to the user

            await message.reply({

                body: `🖼️ Image generated based on the prompt: "${prompt}"`,

                attachment: result.imageUrl

            });

        } catch (error) {

            console.error(error);

            await message.reply("❌ An error occurred while generating the image. Please try again later.");

        }

    }

};



// Function to generate the image based on the prompt

async function generateImage(prompt) {

    const result = await generateImageSDXL({

        prompt: prompt,

        model: "juggernautXL_v45.safetensors [e75f5471]",

        style_preset: "photographic"

    });



    return await wait(result);

}
