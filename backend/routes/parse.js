const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.post("/parse", async (req, res) => {
  const { story } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Tu tarea es dividir la siguiente historia en escenas. Devuelve un arreglo JSON con objetos que contengan:\n- Número de escena\n- Escenario (setting)\n- Personajes involucrados\n- Acciones importantes\n- Diálogos (speaker + line)",
          },
          {
            role: "user",
            content: story,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://storytellerai.com", // opcional
        },
      }
    );

    const data = response.data.choices[0].message.content;
    const json = JSON.parse(data);
    res.json(json);
  } catch (error) {
    console.error("Error con OpenRouter:", error.message);
    res.status(500).json({ error: "Hubo un problema procesando la historia" });
  }
});

module.exports = router;
