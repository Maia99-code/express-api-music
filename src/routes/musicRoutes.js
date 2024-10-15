const express = require("express");
const { faker } = require("@faker-js/faker");

// Importante para el examen
const router = express.Router();

// Función para generar una canción aleatoria
const generarCancion = () => {
  return {
    id: faker.string.uuid(),
    titulo: faker.music.songName(),
    artista: faker.music.artist(),
    album: faker.music.album(),
    duracion: `${faker.number.int({ min: 180, max: 300 })}s`,
    genero: faker.music.genre(),
    fechaLanzamiento: faker.date.past().toISOString().split("T")[0],
  };
};

// Función para generar una playlist aleatoria
const generarPlaylist = (numCanciones = 5) => {
  const canciones = Array.from({ length: numCanciones }, () => generarCancion());

  return {
    idPlaylist: faker.string.uuid(),
    nombre: faker.lorem.words(3).join(' '), 
    descripcion: faker.lorem.sentence(),
    canciones,
    creador: faker.person.fullName(),
    fechaCreacion: faker.date.past().toISOString().split("T")[0],
  };
};

// Ruta para obtener una canción aleatoria
router.get("/cancion", (req, res) => {
  const cancion = generarCancion();
  res.json(cancion);
});

// Ruta para obtener una playlist aleatoria
router.get("/playlist", (req, res) => {
  const { numCanciones } = req.query;
  const playlist = generarPlaylist(parseInt(numCanciones) || 5);
  res.json(playlist);
});

module.exports = router;
