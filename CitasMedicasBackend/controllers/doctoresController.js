const express = require('express');
const pool = require('../config/bd');
const router = express.Router();
const {verifyToken} = require("../middleware/auth")

const SELECT_DOCTOR = `SELECT d.id, d.nombre, d.apellido, d.especialidad, d.horario, u.nombre, u.apellido, u.email, u.telefono FROM doctores d 
                       INNER JOIN usuarios u ON d.usuario_id = u.id`;


router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`${SELECT_DOCTOR} WHERE u.rol = 'doctor'`);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error no se obtuvo la lista de doctores'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const[rows] = await pool.query(`${SELECT_DOCTOR} WHERE d.id = ?`, [req.params.id]);
        if(rows.length === 0) {
            return res.status(404).json({message: 'No se encontro el doctor.'});
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error no se obtuvo el doctor'});    
    }
});

router.get('especialidad/:especialidad', async (req, res) => {
    try{
        const [rows] = await pool.query(`$[SELECT_DOCTOR] WHERE d.especialidad = ? AND u.rol = 'doctor'`, [req.params.especialidad]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error no se obtuvo la lista de doctores por especialidad'});    
    }
});

router.get('/especialidades/lista', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT DISTINCT especialidad FROM doctores ORDER BY especialidad');
        res.json(rows.map(row => row.especialidad));
    } catch (error) {
        res.status(500).json({message: 'Error no se obtuvo la lista de especialidades'});
    }
    });

    