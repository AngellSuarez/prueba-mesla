-- Seed data for MESLA vulnerable application
-- WARNING: Contains intentionally weak and vulnerable data

-- Insert client data with sensitive information
INSERT OR IGNORE INTO clientes (id, nombre, email, telefono, direccion, dni, tarjeta_credito, fecha_registro) VALUES
(1, 'Administrador Sistema', 'admin@mesla.com', '+54-11-1234-5678', 'Av. Santa Fe 1234, CABA', '12345678', '4532-1234-5678-9012', '2023-01-15'),
(2, 'Juan Pérez', 'juan.perez@email.com', '+54-11-2345-6789', 'Corrientes 5678, CABA', '23456789', '5555-4444-3333-2222', '2023-03-20'),
(3, 'María García', 'maria.garcia@email.com', '+54-11-3456-7890', 'Rivadavia 9012, CABA', '34567890', '4111-1111-1111-1111', '2023-05-10'),
(4, 'Usuario Test', 'test@test.com', '+54-11-4567-8901', 'Test Street 123', '45678901', '4000-0000-0000-0002', '2023-12-01');

-- Insert vehicle data
INSERT OR IGNORE INTO autos (id, modelo, vin, año, cliente_id, estado, bateria, fecha_fabricacion, precio) VALUES
(1, 'MESLA Model S', 'MESLA001', 2023, 2, 'activo', 85, '2023-01-15', 75000.00),
(2, 'MESLA Model 3', 'MESLA002', 2023, 2, 'activo', 92, '2023-02-20', 45000.00),
(3, 'MESLA Model X', 'MESLA003', 2022, 3, 'mantenimiento', 67, '2022-11-10', 95000.00),
(4, 'MESLA Model Y', 'MESLA004', 2023, 4, 'activo', 78, '2023-06-05', 55000.00),
(5, 'MESLA Cybertruck', 'MESLA005', 2024, 1, 'prototipo', 95, '2024-01-01', 120000.00);

-- Insert GPS tracking data (sensitive location information)
INSERT OR IGNORE INTO gps_tracking (id, auto_id, cliente_id, latitud, longitud, velocidad, direccion, timestamp) VALUES
(1, 1, 2, -34.6037, -58.3816, 45, 'Av. Corrientes 1234, Buenos Aires', '2024-01-19 14:30:00'),
(2, 2, 2, -34.6118, -58.3960, 0, 'Puerto Madero, Buenos Aires', '2024-01-19 14:32:00'),
(3, 3, 3, -34.5875, -58.3974, 60, 'Palermo, Buenos Aires', '2024-01-19 14:28:00'),
(4, 4, 4, -34.6092, -58.3842, 25, 'Microcentro, Buenos Aires', '2024-01-19 14:35:00');

-- Insert prototype data with trade secrets
INSERT OR IGNORE INTO prototipos (id, nombre, descripcion, estado, fecha_inicio, presupuesto, especificaciones_tecnicas, ubicacion_laboratorio, codigo_acceso, nivel_clasificacion) VALUES
(1, 'MESLA Model Z', 'Prototipo de vehículo autónomo nivel 5', 'desarrollo', '2024-01-01', 50000000.00, 'Batería de grafeno cuántico, Autonomía 800km, Velocidad máxima 300km/h', 'Laboratorio Secreto - Nivel B3, Bunker 7', '7834-ALPHA-ZULU', 'TOP SECRET'),
(2, 'MESLA Truck Pro', 'Camión eléctrico para carga pesada', 'pruebas', '2023-06-15', 25000000.00, 'Carga máxima 40 toneladas, Autonomía 500km', 'Planta Norte - Sector C', '9921-BETA-XRAY', 'CONFIDENCIAL'),
(3, 'MESLA AeroVehicle', 'Vehículo volador eléctrico', 'conceptual', '2024-03-01', 100000000.00, 'Propulsión electromagnética, Altitud máxima 3000m', 'Hangar Clasificado - Área 51B', 'CLASSIFIED-OMEGA-7', 'TOP SECRET');

-- Insert supplier data with sensitive business information
INSERT OR IGNORE INTO proveedores (id, nombre, contacto, email, telefono, direccion, tipo_suministro, contrato_valor, descuento_especial, condiciones_pago, cuenta_bancaria, cbu, cuit, clasificacion, nivel_acceso) VALUES
(1, 'BateriasTech SA', 'Carlos Mendez', 'carlos@bateriastech.com', '+54-11-5555-0001', 'Zona Industrial Norte, Lote 45', 'Baterías de litio', 15000000.00, 15, '30 días', '0123456789012345', '0170123456789012345678', '30-12345678-9', 'Proveedor Estratégico', 'ALTO'),
(2, 'ElectroMotores Corp', 'Ana Rodriguez', 'ana@electromotores.com', '+54-11-5555-0002', 'Parque Industrial Sur, Nave 12', 'Motores eléctricos', 8500000.00, 10, '45 días', '9876543210987654', '0170987654321098765432', '30-98765432-1', 'Proveedor Premium', 'MEDIO'),
(3, 'ChasisPro Industries', 'Roberto Silva', 'roberto@chasispro.com', '+54-11-5555-0003', 'Ruta 9 Km 45, Complejo Industrial', 'Chasis y carrocería', 12000000.00, 8, '60 días', '1122334455667788', '0171122334455667788990', '30-11223344-5', 'Proveedor Estándar', 'BAJO');

-- Insert some system logs (insufficient logging)
INSERT OR IGNORE INTO logs_sistema (usuario_id, accion, timestamp, ip_address, user_agent) VALUES
(1, 'LOGIN_SUCCESS', '2024-01-19 09:00:00', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
(2, 'VIEW_DASHBOARD', '2024-01-19 09:15:00', '192.168.1.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
(1, 'ACCESS_PROTOTYPES', '2024-01-19 10:30:00', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
-- Missing: Failed login attempts, security events, data access logs, etc.
