CREATE DATABASE IF NOT EXISTS hospital;
USE hospital;

-- Tabla de usuarios (solo pacientes)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  rol VARCHAR(20) DEFAULT 'paciente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  especialidad VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS citas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  paciente_id INT NOT NULL,
  doctor_id INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  motivo TEXT NOT NULL,
  estado VARCHAR(20) DEFAULT 'confirmada',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctores(id) ON DELETE CASCADE
);

INSERT INTO usuarios (nombre, apellido, email, password, rol) VALUES 
('Hector', 'Rodriguez', 'hector@hospitaleurohonduras.com', '$2a$10$hash', 'doctor'),
('Carlos', 'Lanza', 'carlos@hospitaleurohonduras.com', '$2a$10$hash', 'doctor'),
('Javier', 'Cerrato', 'javier@hospitaleurohonduras.com', '$2a$10$hash', 'doctor'),
('Pedro', 'Rodríguez', 'pedro@hospitaleurohonduras.com', '$2a$10$hash', 'doctor');

INSERT INTO doctores (usuario_id, especialidad) VALUES 
(1, 'Medicina General'),
(2, 'Pediatría'),
(3, 'Cardiología'),
(4, 'Dermatología');
