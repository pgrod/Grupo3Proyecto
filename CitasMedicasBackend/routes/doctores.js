const express = require('express');
const pool = require('../config/bd');
const router = express.Router();
const {verifyToken} = require("../middleware/auth")



router.get('especialidad/:especialidad', async (req, res) => {
    try{
        const [rows] = await pool.query(`$[SELECT_DOCTOR] WHERE d.especialidad = ? AND u.rol = 'doctor'`, [req.params.especialidad]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error no se obtuvo la lista de doctores por especialidad'});    
    }
});

router.get('/especialidades', async (req, res) => {
    try {
        const [especialidades] = await pool.query('SELECT DISTINCT especialidad FROM doctores ORDER BY especialidad');
        res.json(especialidades.map(e => e.especialidad));
    } catch (error) {
        res.status(500).json({message: 'Error no se obtuvieron las especialidades.'});
    }
    });

router.get('/', async (req, res) => {
    try{
        const [doctors] = await pool.query(`SELECT d.id, d.especialidad, u.nombre, u.apellido FROM doctores d INNER JOIN usuarios u ON d.usuario_id = u.id ORDER BY u.nombre`);
        res.json(doctors);

    } catch (error) {
        console.error('Error al obtener doctores:', error);
        res.status(500).json({message: 'Error al obtener doctores.'});
    }
    });


module.exports = router;