const express = require('express');
const musicRoutes = require('./routes/musicRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Usamos las rutas de música
app.use('/api/music', musicRoutes);

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
