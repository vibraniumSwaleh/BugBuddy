import express from "express";

const app = express();
const PORT = 4000;
const pagesServer = express.static("public");

app.use("/", pagesServer);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/hello", (req, res) => {
  res.send("Hellow World!");
});
