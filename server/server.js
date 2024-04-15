import express from "express";

const app = express();
const PORT = 3000;
const pagesServer = express.static("public");

app.use("/", pagesServer);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
