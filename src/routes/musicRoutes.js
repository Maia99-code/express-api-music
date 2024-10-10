const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

// Función para generar una canción aleatoria
const generarCancion = () => {
    return {
      id: faker.string.uuid(),  // Usa faker.string.uuid() en lugar de faker.datatype.uuid()
      titulo: faker.music.songName(),
      artista: faker.person.fullName(),  // Nota: faker.name.fullName() también puede variar según la versión
      album: faker.music.genre(),
      duracion: faker.number.int({ min: 180, max: 300 }) + 's',
      genero: faker.music.genre(),
      fechaLanzamiento: faker.date.past().toISOString().split('T')[0],
    };
  };
  

// Función para generar una playlist aleatoria
const generarPlaylist = (numCanciones = 5) => {
  const canciones = Array.from({ length: numCanciones }, () => generarCancion());

  return {
    idPlaylist: faker.datatype.uuid(),
    nombre: faker.word.words(3),
    descripcion: faker.lorem.sentence(),
    canciones,
    creador: faker.name.fullName(),
    fechaCreacion: faker.date.past().toISOString().split('T')[0],
  };
};

// Ruta para obtener una canción aleatoria
router.get('/cancion', (req, res) => {
  const cancion = generarCancion();
  res.json(cancion);
});

// Ruta para obtener una playlist aleatoria
router.get('/playlist', (req, res) => {
  const { numCanciones } = req.query;
  const playlist = generarPlaylist(numCanciones || 5);
  res.json(playlist);
});

module.exports = router;
