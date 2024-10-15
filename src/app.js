const express = require('express');
const musicRoutes = require('./routes/musicRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Usamos las rutas de música
app.use('/api/music', musicRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Levantamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
