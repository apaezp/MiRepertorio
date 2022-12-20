const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const fs = require("fs");

const {
  getData,
  nuevaCancion,
  editarCancion,
  eliminarCancion,
} = require("index.html ");

app.get("/", (req, res) => {
  const endpoint = fs.readFileSync("index.html", "utf8");
  res.send(endpoint);
});

app.get("/canciones", async (req, res) => {
  let resultado = await getData(datos);
  res.json(JSON.stringify(resultado));
});

app.post("/cancion", async (req, res) => {
  try {
    const datos = Object.values(req.body);
    const respuesta = await nuevaCancion(datos);
    res.send(201);
    res.end(JSON.stringify(respuesta));
  } catch (error) {
    res.end(
      JSON.stringify({
        code: error.code,
        message: "Error inesperado. Contacte al administrador.",
      })
    );
  }
});

app.put("/cancion", async (req, res) => {
  try {
    const datos = Object.values(req.body);
    const respuesta = await editarCancion(datos);
    res.statusCode(201);
    res.end(JSON.stringify(respuesta));
  } catch (error) {
    res.end(
      JSON.stringify({
        code: error.code,
        message: "Error inesperado. Contacte al administrador.",
      })
    );
  }
});

app.delete("/cancion/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const respuesta = await eliminarCancion(id);
    res.statusCode(201);
    res.end(JSON.stringify(respuesta));
  } catch (error) {
    res.end(
      JSON.stringify({
        code: error.code,
        message: "Error inesperado. Contacte al administrador.",
      })
    );
  }
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
