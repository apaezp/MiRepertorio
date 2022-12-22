const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const fs = require("fs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
  res.json(canciones);
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

  const index = canciones.findIndex((cancion) => cancion.id === parseInt(id));
  canciones[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("canción actualizada");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

  const index = canciones.findIndex((cancion) => cancion.id === parseInt(id));
  canciones.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("canción eliminada");
});

app.listen(3000, console.log("Server running on port 3000"));
