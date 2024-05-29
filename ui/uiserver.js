import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const apiProxyTarget = process.env.API_PROXY_TARGET;
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;
const env = { UI_API_ENDPOINT };
const PORT = process.env.UI_SERVER_PORT || 8000;
const app = express();
const pageServer = express.static("public");

if (apiProxyTarget) {
  app.use("/graphql", createProxyMiddleware({ target: apiProxyTarget }));
}
app.use("/", pageServer);
app.get("/env.js", (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.listen(PORT, () => {
  console.log(`UI server listening on port ${PORT}`);
});
