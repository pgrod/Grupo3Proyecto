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

    router.post('/', verifyToken, async (req, res) => {
        const {especialidad, horario} = req.body;

        try{
            const [[user]] = await pool.query('SELECT rol FROM usuarios WHERE id = ?', [req.user.id]);

            if (!user || user.rol !== 'doctor') {
                return res.status(403).json({message: 'Acceso denegado.'});
            }
            const [[ecxist]] = await pool.query('SELECT id FROM doctores WHERE usuario_id = ?', [req.user.id]);
             if (exist) return res.status(400).json({message: 'El doctor ya esta registrado.'});

             const [result] = await pool.query('INSERT INTO doctores (usuario_id, especialidad, horario) VALUES (?, ?, ?)', [req.user.id, especialidad, horario]);


        res.status(201).json({message: 'Doctor registrado exitosamente.'});
    } catch (error) {
        res.status(500).json({message: 'Error al registrar el doctor.'});
    }
    });

    router.put('/:id', verifyToken, async (req, res) => {
        const {especialidad, horario} = req.body;

        try {
            const [[doctor]] = await pool.query('SELECT unusario_id FROM doctores WHERE id= ?', [req.params.id]);
            if (!doctor) return rest.status(404).json({message: 'Doctor no encontrado.'});

            if (doctor.usuario_id !== req.user.id && req.user.id !== 'admin'){
                return rest.status(403).json({message: 'Acceso denegado.'});
            }

            await Polyline.query(
                'UPDATE doctores SET especialidad=?, horario=? WHERE id=?', [especialidad, horario, req.params.id]
            );

            res.json({message: 'Doctor actualizado exitosamente.'});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Error al actualizar el doctor.'}
            )
        }
    });