const express = require('express');
const router = express.Router();

router.get('/info', (req, res) => {
    res.json({
        nombre: 'Hospital EuroHonduras',
        direccion: 'I calle, Avenida Atlantida, La Ceiba, Atlantida',
        telefono: '+504 9529-5955',
        email:'info@hospitaleurohonduras.com',
        horario: 'Lunes a Viernes 8:00am - 6:00pm',
        ubicacion:{
            latitude: 15.7597,
            longitude: -86.7822,
        },
        Servicios: [
            'Consulta General',
            'Emergencias',
            'Laboratorio Clínico',
            'Radiología e Imágenes',
            'Farmacia'
        ]
    });
});

module.exports = router;