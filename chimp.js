const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: {CHIMP_API},
  server: {CHIMP_SERV},
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();