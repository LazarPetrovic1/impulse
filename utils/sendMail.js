const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");

function base64Encode(file) {
  const bitmap = fs.readFileSync(file);
  return new Buffer.from(bitmap).toString("base64");
}

const dataBase64 = base64Encode(
  path.join(
    __dirname,
    "..",
    "client",
    "src",
    "assets",
    "impulse-logos-redesigned",
    "Impulse_logo_medium.png"
  )
);

function sendEmail(to) {
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to, // Change to your recipient
    from: "impulsemakeanimpact@gmail.com", // Change to your verified sender
    subject: "Reset or change your password",
    attachments: [
      {
        filename: `logo.png`,
        content: dataBase64,
        type: "image/png",
        disposition: "inline",
        content_id: "logoimage",
      },
    ],
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Change Password for Impulse</title>
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      ::selection {
        background-color: yellow;
        color: black;
      }
      html {
        background: linear-gradient(90deg, rgba(17,17,17,1) 0%, rgba(0,0,55,1) 44%, rgba(17,17,17,1) 100%);
        height: 100vh;
      }
      body {
        color: white;
      }
      .nav {
        padding: 1rem;
        display: flex;
        justify-content: center;
      }
      section {
        font-family: "Ubuntu", sans-serif;
        max-width: 800px;
        margin: 2rem auto;
      }
      section p, li {
        font-size: 20px;
        margin-bottom: 0.8rem;
      }
      section h2 {
        text-align: center;
        font-size: 2.4rem;
        margin-bottom: 0.8rem;
      }
      .intro,
      .strongpass,
      .recap {
        margin: 1.5rem 0;
      }

      a, a:visited {
        text-decoration: none;
        color: white;
      }

      a:hover {
        color: yellow;
      }

      .button {
        padding: 10px 20px;
        border: 1px solid white;
        border-radius: 5px;
      }

      .reset {
        padding: 1.5rem 0 4rem 0;
        display: flex;
        justify-content: center;
        text-align: center;
      }
      </style>
      </head>
      <body>
      <nav class="nav">
        <a href='http://localhost:3000/'>
          <img
            src="cid:logoimage"
            alt="Impulse Logo"
            style="display: block; margin: auto;"
            title="Impulse Logo"
            width="268" height="100"
          >
        </a>
      </nav>
      <section>
      <div class="intro">
      <h2>Thank you for using Impulse's services.</h2>
      <p>It has come to our attention that you have forgotten your password or would like to change it.</p>
      <p>If that is the case, kindly click on the link provided below.</p>
      <p>On the off chance that you did not ask for a password reset, please ignore this e-mail.</p>
      <p>Before you click the link and reset your password however, please take a look at our strong password recommendations.</p>
      </div>
      <div class="strongpass">
      <h2>How to make an actual strong password</h2>
      <p>Bad "strong" password: <span style="padding-left: 1rem"><strong>}_{a*Dds&F_f(PW)4=.:</strong></span></p>
        <p>Good, actually strong password: <span style="padding-left: 1rem;"><b>helloworld</b><i>12345</i><b>iamreallytired</b><i>678910</i></span></p>
        <p>While the first example is a god-awful garble of vomit nobody would ever consider remembering, the second password is quite succinct and easy to recall.</p>
        <p>
        The <a href="https://random-ize.com/how-long-to-hack-pass/">how long to crack password guys</a> say that the first example would be cracked in 3.285431628382323<sup>22</sup> years.
        </p>
        <p>The second password, although much easier to remember, produces an even better result of 3.346747044814635<sup>37</sup> years - making it quite clear which approach is the correct one.</p>
        </div>
        <div class="recap">
        <h2>The TL;DR</h2>
        <ol>
        <li>Make sure your password is long - at least 15 characters guarantees you absolute safety.</li>
        <li>Make sure your password is easy to remember - a line of code or a lyric from some song might do the trick.</li>
        <li>Make sure your security question is <b>unique</b> and that only <b>YOU</b> get the reference to whatever you might have chosen.</li>
        <li>Simply write it down, if you're scared of forgetting it - no one's going to hack you if you're not in that environment - it's simply not going to happen.</li>
        </ol>
        </div>
        <div class="reset">
        <a href="http://localhost:3000/impulse/change-password?reroute=1" target="_blank" class="button">
        Click here to reset your password
        </a>
        </div>
        </section>
        </body>
        </html>
      `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("SENT");
      return "Email sent";
    })
    .catch((error) => {
      console.log("ERROR", error.response.body);
      return error;
    });
}

module.exports = { sendEmail };

// SENDGRID: pass - tercajseutripizdematerine
// API KEY: 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
