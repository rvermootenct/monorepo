const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const config = {};

/*
Twitch will provide the extension secret, base64 encoded
So we must base64 decode it before we can use it.
*/
config.secret = Buffer.from(
  process.env.TWITCH_EXTENSION_SECRET || "",
  "base64"
);

/*
Lets generate an App Access Token
This generates one token, which will be valid for around 60 days

For now, this will need to be refreshed manually
*/
const params = new URLSearchParams();
params.append("client_id", process.env.TWITCH_CLIENT_ID);
params.append("client_secret", process.env.TWITCH_CLIENT_SECRET);
params.append("grant_type", "client_credentials");

fetch("https://id.twitch.tv/oauth2/token", {
  method: "POST",
  body: params,
})
  .then((resp) => resp.json())
  .then((resp) => {
    if (resp.hasOwnProperty("access_token")) {
      config.api_token = resp.access_token;
      console.log("Set an App Access Token", config.api_token);
    } else {
      // some thing REALLY went wrong
      console.error("The Twich extension WON’T WORK");
      console.error("No access_token", resp.body);
    }
  })
  .catch((err) => {
    if (err.response) {
      console.error(
        "Error at token generation",
        err.response.statusCode,
        err.response.body
      );
    } else {
      console.error("Error at token generation", err);
    }
  });

exports.default = config;
