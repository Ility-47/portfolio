const express = require("express");
const nodemailer = require("nodemailer");

const server = express();

server.use(express.static(__dirname + '/' ));
server.use(express.json());

server.get("*", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "ityaksovtestmail@mail.ru",
        pass: "VEpbmhqG7Gprddj2vrg3",
      },
    });

    const { name, email, message } = req.body;
    console.log("бабубэ")
    await transporter.sendMail({
      from: "ityaksovtestmail@mail.ru",
      to: "ityaksovtestmail@mail.ru",
      subject: `${name} (${email})`,
      text: message,
      html: `
        <p>${name}</p>
        <p>${email}</p>
        <p>${message}</p>
        `,
    });

    return res.status(200).send({ status: 200, message: "Success" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});

server.listen(5500, () => {
  console.log(`App listening on port 3000:`);
});