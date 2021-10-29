import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_KEY)

export const sendRegistrationEmail = async recipientAddress => {
  const msg = {
    to: recipientAddress,
    from: process.env.SENDER_EMAIL,
    subject: "Sending with Twilio SendGrid should be easy right?",
    text: "Hello world",
  }

  await sgMail.send(msg)
}