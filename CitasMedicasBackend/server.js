const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/bd');

const app = express();

app.use(cors());
app.use(express.json());


const JWT_SECRET = process.env.JWT_SECRET || 'la_clave_secreta_para_jwt';