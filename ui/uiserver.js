import express from "express";

const PORT = 8000;
const app = express();
const pageServer = express.static("public");

app.use("/", pageServer);

app.listen(PORT, () =>
{
  console.log(`UI server listening on port ${PORT}`);
});
