import express from "express";
import dotenv from "dotenv";
dotenv.config();

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || "http://localhost:3000/graphql";
const env = { UI_API_ENDPOINT };
const PORT = process.env.UI_SERVER_PORT || 8000;
const app = express();
const pageServer = express.static("public");

app.use("/", pageServer);
app.get("/env.js", (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.listen(PORT, () => {
  console.log(`UI server listening on port ${PORT}`);
});
