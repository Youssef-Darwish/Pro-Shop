const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const log4js = require("log4js");
const logger = log4js.getLogger("WelcomeEmail.js");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (recipientEmail) => {
  const msg = {
    to: recipientEmail,
    from: process.env.SENDGRID_VERIFIED_SENDER,
    subject: "Welcome to proshop",
    text: "You can now start shopping with best prices and products",
    html:
      "<strong>You can now start shopping with best prices and products</strong>",
  };

  try {
    await sgMail.send(msg);
    logger.debug(`Welcome email sent to ${recipientEmail}`);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { sendWelcomeEmail };
