import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Отсутствует параметр 'url'");
  }

  try {
    const response = await fetch(targetUrl, {
      redirect: "follow", // Следовать за перенаправлениями
    });

    if (!response.ok) {
      return res.status(response.status).send("Ошибка при загрузке изображения");
    }
    res.setHeader("Access-Control-Allow-Origin", "*"); // Или укажите конкретный домен
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Определим тип контента (JPEG/PNG/GIF и т.д.) и передадим его в заголовках
    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType);

    // Передача потока байтов изображения клиенту
    response.body.pipe(res);
  } catch (error) {
    console.error("Ошибка проксирования:", error);
    res.status(500).send("Ошибка при проксировании изображения");
  }
});

app.listen(4000, () => {
  console.log("Изображения проксируются через http://localhost:4000");
});