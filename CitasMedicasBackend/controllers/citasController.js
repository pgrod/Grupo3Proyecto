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