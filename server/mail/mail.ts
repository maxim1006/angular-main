import {config as dotenvConfig} from "dotenv";

dotenvConfig();

// npm install --save @sendgrid/mail

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

// сервис для отправки emails
// https://app.sendgrid.com/guide/integrate/langs/nodejs

// Uncomment following for usage

// const sgMail = require('@sendgrid/mail');
//
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//
// const msg = {
//     to: 'maximprosv@gmail.com',
//     from: 'angular-main@project.com',
//     // from: 'test@example.com',
//     subject: 'Hello from angular main project!',
//     text: 'Text for email',
//     html: `
//
//         You are awesome, have a good day!!!! <br/>
//
//         <img src="https://via.placeholder.com/200/747ef7/f7b701/?text=warm%20hugs" alt="" style="display: inline-block; width: 200px; height: 200px;">
// `,
// };
//
// try {
//     sgMail.send(msg);
//     console.log("email send to maximprosv@gmail.com");
// } catch (e) {
//     console.log("Send mail error ", e);
// }
