import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.UI_SERVER_PORT || 8000;
const app = express();
const pageServer = express.static("public");

app.use("/", pageServer);

app.listen(PORT, () => {
  console.log(`UI server listening on port ${PORT}`);
});
