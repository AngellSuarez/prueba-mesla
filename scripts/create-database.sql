-- MESLA Vulnerable Database Schema
-- WARNING: This database contains intentional vulnerabilities for educational purposes

-- Users table with weak password storage
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Stored in plain text (vulnerable)
    email VARCHAR(100),
    role VARCHAR(20) DEFAULT 'cliente',
    nombre VARCHAR(100),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_login DATETIME,
    intentos_login INTEGER DEFAULT 0,
    bloqueado BOOLEAN DEFAULT FALSE
);

-- Clients table with sensitive data
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    dni VARCHAR(20), -- Sensitive personal data
    tarjeta_credito VARCHAR(20), -- Credit card in plain text (vulnerable)
    fecha_registro DATE,
    estado VARCHAR(20) DEFAULT 'activo'
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS autos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modelo VARCHAR(100) NOT NULL,
    vin VARCHAR(50) UNIQUE NOT NULL,
    año INTEGER,
    cliente_id INTEGER,
    estado VARCHAR(20) DEFAULT 'activo',
    bateria INTEGER DEFAULT 100,
    fecha_fabricacion DATE,
    precio DECIMAL(10,2),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- GPS tracking table with sensitive location data
CREATE TABLE IF NOT EXISTS gps_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auto_id INTEGER,
    cliente_id INTEGER,
    latitud DECIMAL(10,8), -- Precise location data (privacy concern)
    longitud DECIMAL(11,8),
    velocidad INTEGER,
    direccion TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auto_id) REFERENCES autos(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Prototypes table with trade secrets
CREATE TABLE IF NOT EXISTS prototipos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50),
    fecha_inicio DATE,
    presupuesto DECIMAL(15,2), -- Sensitive financial data
    especificaciones_tecnicas TEXT, -- Trade secrets
    ubicacion_laboratorio VARCHAR(200), -- Sensitive location
    codigo_acceso VARCHAR(50), -- Security credentials (vulnerable)
    nivel_clasificacion VARCHAR(20) DEFAULT 'CONFIDENCIAL'
);

-- Suppliers table with business secrets
CREATE TABLE IF NOT EXISTS proveedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20),
    direccion TEXT,
    tipo_suministro VARCHAR(100),
    contrato_valor DECIMAL(15,2), -- Sensitive business data
    descuento_especial INTEGER,
    condiciones_pago VARCHAR(100),
    cuenta_bancaria VARCHAR(50), -- Banking information (vulnerable)
    cbu VARCHAR(22),
    cuit VARCHAR(15),
    clasificacion VARCHAR(50),
    nivel_acceso VARCHAR(20)
);

-- System logs table (insufficient logging)
CREATE TABLE IF NOT EXISTS logs_sistema (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    accion VARCHAR(100),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT
    -- Missing: detailed security events, failed login attempts, etc.
);

-- Configuration table with exposed secrets
CREATE TABLE IF NOT EXISTS configuracion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clave VARCHAR(100) NOT NULL,
    valor TEXT NOT NULL,
    descripcion TEXT,
    es_sensible BOOLEAN DEFAULT FALSE
);

-- Insert vulnerable default data
INSERT OR IGNORE INTO usuarios (username, password, email, role, nombre) VALUES
('admin', 'admin', 'admin@mesla.com', 'admin', 'Administrador Sistema'),
('cliente1', 'test123', 'juan.perez@email.com', 'cliente', 'Juan Pérez'),
('cliente2', 'password', 'maria.garcia@email.com', 'cliente', 'María García'),
('test', '123456', 'test@test.com', 'cliente', 'Usuario Test');

-- Insert sensitive configuration (exposed secrets)
INSERT OR IGNORE INTO configuracion (clave, valor, descripcion, es_sensible) VALUES
('db_password', 'super_secret_123', 'Database password', TRUE),
('api_key', 'sk-1234567890abcdef', 'External API key', TRUE),
('encryption_key', 'weak_key_123', 'Data encryption key', TRUE),
('admin_email', 'admin@mesla.com', 'Administrator email', FALSE),
('backup_location', '/var/backups/mesla/', 'Backup directory', TRUE);

-- Vulnerable indexes (missing on sensitive queries)
-- CREATE INDEX idx_usuarios_username ON usuarios(username); -- Missing for login queries
-- CREATE INDEX idx_gps_cliente ON gps_tracking(cliente_id); -- Missing for location queries
