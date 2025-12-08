const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());

const usuariosRoutes = require('./routes/usuarios');
const doctoresRoutes = require('./routes/doctores');
const citasRoutes = require('./routes/citas');
const hospitalRoutes = require('./routes/hospital');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/doctores', doctoresRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/hospital', hospitalRoutes);

app.get('/', (req, res) => {
    res.json({message: 'API de Citas Médicas'});
});

app.use((req, res) => {
    res.status(404).json({message: 'Ruta no encontrada.'});
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;