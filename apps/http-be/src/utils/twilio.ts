import twilio from "twilio";
import config from "../config";
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function sendMessage(body: string, to: string) {
    const message = await client.messages.create({
      body: body,
      from: "+13612824592",
      to: to
    });
}