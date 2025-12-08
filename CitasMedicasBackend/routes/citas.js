const express = require('express');
const pool = require('../config/bd');
const router = express.Router();
const {verifyToken} = require('../middleware/auth');

router.get('/mis-citas', verifyToken, async (req, res) => {
    try {
        const [citas] = await pool.query(
            `SELECT c.id, c,fecha, c.hora, c.motivo, c.estado CONCAT(u.nombre, ' ', u.apellido) AS doctor_nombre, d.especialidad AS doctor_especialidad
            FROM citas c INNER JOIN doctores d ON c.doctor_id = d.id
            INNER JOIN usuarios u ON d.usuarios_id = u.id WHERE c.paciente_id = ? ORDER BY c.fecha DESC, c.hora DESC`, [req.user.id]);
        res.json(citas);
    } catch (error){
        console.error('Error al obtener cita: ', error);
        res.status(500).json({message: 'Error al obtener la cita.'});
    }
    });

router.get('/disponibilidad/:doctor_id/:fecha', async (req, res) => {
      const{doctor_id, fecha} = req.params;

      try{
        const[citasOcupadas] = await pool.query(
            `SELECT hora FROM citas WHERE doctor_id = ? AND fecha = ? AND estado = 'cancelada'`, [doctor_id, fecha]);
            const horarios = [
                '8:00am', '9:00am', '10:00am', '11:00am',
                '1:00pm', '2:00pm', '3:00pm', '4:00pm'
            ];

        const horasOcupadas = citasOcupadas.map(c => c.hora.substring(0,5));
        const horariosDisponibles = horarios.filter(h => !horasOcupadas.includes(h));

        res.json({disponibles : horariosDisponibles});
        } catch (error) {
            console.error('Error al obtener disponibilidad: ', error);
            res.status(500).json({message: 'Error al obtener la disponibilidad.'}
        );
      }
});

router.post('/agendar', verifyToken, async (req, res) => {
    const {doctor_id, fecha, hora, motivo} = req.body;

    if(!doctor_id || !fecha || !hora || !motivo) {
        return res.status(400).json({message: 'Porfavor complete todos los campos requeridos.'});
    }

    try {
        const [doctor] = await pool.query('SELECT id FROM doctores WHERE id = ?', [doctor_id]);
        if (doctor.length === 0) {
            return res.status(400).json({message: 'El doctor no encontrado.'});
        }

        const [citaExistente] = await pool.query(
            'SELECT id FROM citas WHERE doctor_id = ? AND fecha = ? AND hora = ? AND estado = "cancelada"', [doctor_id, fecha, hora]);

        if(citaExistente.length > 0) {
            return res.status(400).json({message: 'El horario no esta disponible.'});
        }

        const [result] = await pool.query(
            'INSERT INTO citas (paciente_id, doctor_id, fecha, hora, motivo, estado) VALUES (?, ?, ?, ?, ?, "confirmada")',
            [req.user.id, doctor_id, fecha, hora, motivo]);

        const [citaCreada] = await pool.query(`SELECT c.id, c.fecha, c.hora, c.motivo, c.estado, CONCAT(u.nombre, ' ', u.apellido) AS doctor_nombre, d.especialidad AS doctor_especialidad FROM citas c INNES JOIN doctores d ON c.citas_id = d.id INNER JOIN usuarios u ON d.usuarios_id = u.id  WHERE c.id = ?`, [result.insertId]);

        res.status(201).json({message: 'Cita agendada exitosamente.', cita: citaCreada[0]});
    } catch (error) {
        console.error('Error al agendar la cita: ', error);
        res.status(500).json({message: 'Error al agendar la cita.'} 

        )
    }
});

module.exports = router;

