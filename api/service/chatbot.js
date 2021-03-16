const tmi = require("tmi.js");

// getting a token: https://twitchapps.com/tmi/
// user: xd_chatbot
// pass: minecraftspeedrun1

const getMods = async (channel) => {
  return new Promise((resolve, reject) => {
    const client = new tmi.Client({
      options: { debug: false, messagesLogLevel: "error" },
      connection: {
        reconnect: true,
        secure: true,
      },
      identity: {
        username: "xd_chatbot", // TODO: move to env
        password: "oauth:tvossioi5mdkgmzecczbgfc138lmlu", // TODO: move to env
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
