import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sendGridTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "loy125@daum.net",
    to: adress,
    subject: "🔒 Login Secret for Prismagram 🔒",
    html: `
    <div style="font-family: 'Apple SD Gothic Neo', 'sans-serif'; width: 540px; height: 350px; border-top: 4px solid rgba(45, 176, 116); border-bottom: 4px solid rgba(45, 176, 116); margin: 100px auto; padding: 30px 0; box-sizing: border-box;">
	<h1 style="margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;">
		<span style="color: rgba(45, 176, 116);">인증 비밀번호</span> 안내입니다.
	</h1>
	<p style="font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;">
		안녕하세요.<br />
		요청하신 Prismagram의 <span style="color: rgba(45, 176, 116)";>인증 비밀번호</span>가 생성되었습니다.<br />
		감사합니다.
	</p>
	<p style="font-size: 16px; margin: 40px 5px 20px; line-height: 28px;">
		인증 비밀번호:  <br />
		<span style="font-size: 24px;"> ${secret} </span>
	</p>
</div>
    `
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
