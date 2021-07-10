const tmi = require("tmi.js");

// getting a token: https://twitchapps.com/tmi/

const getMods = async (channel) => {
  return new Promise((resolve, reject) => {
    const client = new tmi.Client({
      options: { debug: false, messagesLogLevel: "error" },
      connection: {
        reconnect: true,
        secure: true,
      },
      identity: {
        username: process.env.CHATBOT_USERNAME,
        password: process.env.CHATBOT_PASSWORD,
      },
      channels: [channel],
    });

    client.connect().catch(console.error);

    client.on("mods", (channel, mods) => {
      client.disconnect();
      resolve(mods);
    });

    client.on("error", (channel, mods) => {
      reject(new Error("soemthing went wong"));
    });

    client.on("join", () => {
      client.say(channel, "/mods\n");
    });
  });
};

module.exports = {
  getMods,
};
