const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = "TU_TWILIO_SID";
const authToken = "TU_TWILIO_TOKEN";
const client = twilio(accountSid, authToken);

const WHATSAPP_FROM = "whatsapp:+34655315935"; 

app.post("/enviar-cupon", async (req, res) => {
  const { phone, cupon } = req.body;

  if (!phone || !cupon) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    await client.messages.create({
      from: WHATSAPP_FROM,
      to: `whatsapp:${phone}`,
      body: `🎁 ¡Hola! Aquí tienes tu cupón Amazon: ${cupon}`
    });

    return res.json({ ok: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
});

app.listen(3000, () => console.log("Servidor en puerto 3000"));
