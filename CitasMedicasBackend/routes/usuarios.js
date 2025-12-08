const express = require('express');
const pool = require('../config/bd');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {verifyToken, JWT_SECRET} = require('../middleware/auth');

router.post('/registro', async (req, res) => {
          const {nombre, apellido, email, password} = req.body;

          if(!nombre || !apellido || !email || !password) {

                    return res.status(400).json({message: 'Porfavor complete todos los campos requeridos.'});
          }

          if(password.length < 3){
                    return res.status(400).json({message: 'La contraseña debe tener al menos 3 caracteres.'});
          }
          try {
            const [exist] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
            if(exist.length > 0) {
                      return res.status(400).json({message: 'El email esta registrado.'});
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await pool.query('INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)',
            [nombre, apellido, email, hashedPassword]);

            res.status(201).json({message: 'Usuario registrado exitosamente.'});
          } catch (error) {
                    console.error(error);
                        res.status(500).json({message: 'Error en el servidor.'});
                    }
          });

router.post('/login', async (req, res) => {
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json({message:'Porfavor complete todos los campos requeridos.'});
            }
            try {
                const [users] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
                if(users.length === 0) {
                    return res.status(400).json({message: 'Credenciales invalidas.'});
                }

                const user = users[0];
                const valid = await bcrypt.compare(password, user.password);

                if(!valid) {
                    return res.status(400).json({message: 'Credenciales invalidas.'});
                }

                const token = jwt.sign({id: user.id, email:user.email}, JWT_SECRET, {expiresIn: '24h'});
                res.json({token, user: {id: user.id, nombre: user.nombre, apellido: user.apellido, email: user.email}
                });

            } catch (error) {
                console.error(error);
                res.status(500).json({message: 'Error en el login.'});
            }});

router.get('/perfil', verifyToken, async (req, res) => {
    try{
        const [user] = await pool.query('SELECT id, nombre, apellido, email, rol FROM usuarios WHERE id = ?', [req.user.id]);

        res.json(user[0] ||{});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener el perfil del usuario.'});
}});


module.exports = router;