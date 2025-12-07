const express = require('express');
const pool = require('../config/bd');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {verifyToken, JWT_SECRET} = require('../middlewares/authMiddleware');

router.post('/registro', async (req, res) => {
          const {nombre, apellido, email, password, telefono, fecha_nacimiento, direccion, rol} = req.body;

          if(!nombre || !apellido || !email || !password || !telefono || !fecha_nacimiento || !direccion || !rol) {

                    return res.status(400).json({message: 'Porfavor complete todos los campos requeridos.'});
          }
          try {
            const [existing] = await StylePropertyMapReadOnly.query('SELECT id FROM usuarios WHERE email = ?', [email]);
            if(existing.length > 0) {
                      return res.status(400).json({message: 'El email esta registrado.'});
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await pool.query('INSERT INTO usuarios (nombre, apellido, email, password, telefono, fecha_nacimiento, direccion, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, email, hashedPassword, telefono, fecha_nacimiento, direccion, rol]);

            res.status(201).json({message: 'Usuario registrado exitosamente.'});
          } catch (error) {
                    console.error(error);
                        res.status(500).json({message: 'Error en el servidor.'});
                    }
          });

router.post('/login', async (req, res) => {
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400),json({message:'Porfavor complete todos los campos requeridos.'});
            }
            try {
                const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
                if(rows.length === 0) {
                    return res.status(400).json({message: 'Credenciales invalidas.'});
                }

                const user = rows[0];
                const valid = await bcrypt.compare(password, user.password);

                if(!valid) {
                    return res.status(400).json({message: 'Credenciales invalidas.'});
                }

                const token = jwt.sign({id: user.id, rol: user.rol}, JWT_SECRET, {expiresIn: '24h'});
                res.json({token, user: {id: user.id, nombre: user.nombre, apellido: user.apellido, email: user.email, rol: user.rol}
                });

            } catch (error) {
                console.error(error);
                res.status(500).json({message: 'Error en el login.'});
            }});

router.get('/perfil', verifyToken, async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT id, nombre, apellido, email, telefono, fecha_nacimiento, direccion, rol FROM usuarios WHERE id = ?', [req.user.id]);

        res.json(rows[0] ||{});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener el perfil del usuario.'});
}});

router.get ('/', verifyToken, async (req, res) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({message: 'Acceso denegado.'});
    }
    try {
        const [rows] = await pool.query('SELECT id, nombre, apellido, email, telefono, fecha_nacimiento, direccion, rol FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener los usuarios.'});
}});
