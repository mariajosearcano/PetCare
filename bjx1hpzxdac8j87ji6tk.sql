-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: bjx1hpzxdac8j87ji6tk-mysql.services.clever-cloud.com:3306
-- Tiempo de generación: 21-11-2024 a las 14:48:55
-- Versión del servidor: 8.0.22-13
-- Versión de PHP: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bjx1hpzxdac8j87ji6tk`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL,
  `day` date DEFAULT NULL,
  `start_hour` time DEFAULT NULL,
  `end_hour` time DEFAULT NULL,
  `pet_id` int NOT NULL,
  `available_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `available`
--

CREATE TABLE `available` (
  `available_id` int NOT NULL,
  `day` date NOT NULL,
  `start_hour` time DEFAULT NULL,
  `end_hour` time DEFAULT NULL,
  `status` set('available','scheduled') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'available',
  `veterinarian_document` varchar(10) NOT NULL,
  `schedule_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clinic_administrator`
--

CREATE TABLE `clinic_administrator` (
  `document` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clinic_administrator`
--

INSERT INTO `clinic_administrator` (`document`, `name`, `last_name`, `email`, `password`, `phone_number`) VALUES
('1846729387', 'Carlos', 'Ochoa', 'carlos', 'carlos123', 3017462286);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medical_history`
--

CREATE TABLE `medical_history` (
  `medical_history_id` int NOT NULL,
  `diagnosis` varchar(100) NOT NULL,
  `pet_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medical_history`
--

INSERT INTO `medical_history` (`medical_history_id`, `diagnosis`, `pet_id`) VALUES
(4, 'stomach ache', 23),
(5, 'stomach ache', 24),
(7, 'infection', 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medical_history_vaccine`
--

CREATE TABLE `medical_history_vaccine` (
  `medical_history_id` int NOT NULL,
  `vaccine_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medical_history_vaccine`
--

INSERT INTO `medical_history_vaccine` (`medical_history_id`, `vaccine_id`) VALUES
(4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicine`
--

CREATE TABLE `medicine` (
  `medicine_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `stock` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medicine`
--

INSERT INTO `medicine` (`medicine_id`, `name`, `stock`) VALUES
(1234, 'Acetaminofen', 20),
(1237, 'Ibuprofeno', 30),
(1248, 'pepas', 74),
(1253, 'Advil', 89),
(1254, 'Dolex forte', 4),
(1255, 'Prueba', 58),
(1256, 'parvovirosis', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pet`
--

CREATE TABLE `pet` (
  `pet_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `species` varchar(50) NOT NULL,
  `age` int NOT NULL,
  `weight` int NOT NULL,
  `pet_owner_document` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pet`
--

INSERT INTO `pet` (`pet_id`, `name`, `species`, `age`, `weight`, `pet_owner_document`) VALUES
(23, 'luna', 'Vertebrate', 2, 3, '7343624'),
(24, 'sol', 'Vertebrate', 5, 7, '7343624'),
(26, 'bruno', 'Vertebrate', 21, 34, '64457882'),
(32, 'criollo', 'Echinoderm', 2, 14, '12214123'),
(33, 'lilo', 'Cnidarian', 1, 2, '12214123'),
(34, 'arenita', 'Annelid', 14, 2, '12214123'),
(35, 'foo', 'Vertebrate', 23, 200, '12214123'),
(36, 'donatelo', 'Vertebrate', 120, 80, '12214123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pet_owner`
--

CREATE TABLE `pet_owner` (
  `document` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone_number` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pet_owner`
--

INSERT INTO `pet_owner` (`document`, `name`, `last_name`, `email`, `password`, `phone_number`) VALUES
('1000145474', 'Manuela', 'Suarez', 'manuela_diaz82212@elpoli.edu.co', 'c19a6aa795852678ba543fd1be86a160be6d5d8d0d662a4c658666e12c994b43', 3008848574),
('1000477748', 'Ana', 'Diaz', 'manu@elpoli.edu.co', '3d3f894b21598e55598bb623906878e63e08db7c1bb8368a181ff9a13148faee', 3008848574),
('1034987623', 'Maria', 'Jose', 'maria@gmail.com', 'Mq1.1234567', 97527597375),
('11111147', 'Ander', 'Murillo', 'andr@gmail.com', '61aa4223e3f31e334ca9c2103f2a4ea432578dbb18e367521dbfb06d3d5d849d', 3008848585),
('111222', 'Andre', 'Castro', 'andreita@gmail.com', '41de15e8e7a1fc3b5aba41163af22106c947843772f89ec4aa35e56f43f6dcc7', 300852777),
('12214123', 'David', 'Correa', 'deivid-1997@hotmial.com', '1baf24a118016e0032eae5204d480d645226b6830cd33c31fae30b0291a6b84a', 2988410),
('64457882', 'Andrea', 'Ac', 'maria@gmail.co', 'Mq1.567485', 3055555666),
('7343624', 'Juana', 'Cano', 'juana@cm.com', 'Mq1.22222', 8736357822);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL,
  `start_day` date NOT NULL,
  `end_day` date NOT NULL,
  `start_hour` time NOT NULL,
  `end_hour` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `start_day`, `end_day`, `start_hour`, `end_hour`) VALUES
(1, '0000-00-00', '0000-00-00', '08:00:00', '16:00:00'),
(4, '0000-00-00', '0000-00-00', '10:00:00', '18:00:00'),
(5, '0000-00-00', '0000-00-00', '16:00:00', '00:00:00'),
(6, '0000-00-00', '0000-00-00', '00:00:00', '08:00:00'),
(7, '0000-00-00', '0000-00-00', '00:00:00', '00:00:00'),
(8, '0000-00-00', '0000-00-00', '00:00:00', '23:00:00'),
(9, '2024-11-21', '2024-11-30', '00:00:00', '23:00:00'),
(10, '2025-07-28', '2025-08-02', '01:00:00', '02:00:00'),
(11, '2024-11-25', '2024-11-30', '02:00:00', '03:00:00'),
(12, '2024-11-25', '2024-11-30', '01:00:00', '02:00:00'),
(13, '2024-12-09', '2024-12-14', '01:00:00', '02:00:00'),
(14, '2025-07-07', '2025-07-12', '01:00:00', '02:00:00'),
(15, '2025-09-15', '2025-09-20', '03:00:00', '04:00:00'),
(16, '2026-01-12', '2026-01-17', '04:00:00', '05:00:00'),
(17, '2026-04-13', '2026-04-18', '03:00:00', '04:00:00'),
(18, '2024-12-02', '2024-12-07', '04:00:00', '05:00:00'),
(19, '2026-07-13', '2026-07-18', '02:00:00', '23:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `treatment`
--

CREATE TABLE `treatment` (
  `treatment_id` int NOT NULL,
  `medical_history_id` int NOT NULL,
  `medicine_id` int NOT NULL,
  `medicine_type` set('lozenge','syringe','pomade','drop') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dose` smallint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `treatment`
--

INSERT INTO `treatment` (`treatment_id`, `medical_history_id`, `medicine_id`, `medicine_type`, `dose`) VALUES
(16, 7, 1248, 'syringe', 52),
(17, 4, 1255, 'syringe', 100),
(19, 5, 1248, 'drop', 39);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vaccine`
--

CREATE TABLE `vaccine` (
  `vaccine_id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `vaccine`
--

INSERT INTO `vaccine` (`vaccine_id`, `name`) VALUES
(1, 'rabia'),
(2, 'covic');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinarian`
--

CREATE TABLE `veterinarian` (
  `document` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` bigint NOT NULL,
  `specialty` set('dermatologist','cardiologist','endocrinologist','gastroenterologist','neurologist','none') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'none'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `veterinarian`
--

INSERT INTO `veterinarian` (`document`, `name`, `last_name`, `email`, `password`, `phone_number`, `specialty`) VALUES
('09743557', 'Manuela', 'Diaz', 'manu@diaz.com', 'Manu1.888888', 2345679765, 'dermatologist'),
('45845886', 'Valen', 'Vo', 'valen@vo.co', 'Wg1.968hghg', 8567724658, 'cardiologist'),
('7482947278', 'ricardo', 'mena', 'ricardo@gmail.com', 'Mq1.4500gg', 836294817, 'cardiologist'),
('7564767', 'Lusss', 'Miguel', 'luis@miguel.co', 'Mq1.biuf67', 8743764737, 'endocrinologist'),
('75647674', 'Luis', 'Miguel', 'luis@miguel.com', 'Mq1.4587gg', 8743764737, 'gastroenterologist'),
('766754789', 'David', 'Cordoba', 'cordoba@david.mail.com', 'Pq1.dfghjk', 45675478976, 'neurologist'),
('83476294', 'mafalda', 'mafalda', 'josue@mail.co', 'Mq.1llll', 1234567890, 'none'),
('8678432', 'obi', 'obi', 'josue@mail.co', 'Mq1.444444', 1234567891, 'endocrinologist'),
('9847564', 'Lukas', 'Munos', 'munos@mu.so', 'Mq.175835', 7454364347, 'gastroenterologist'),
('9857634', 'Carlos', 'Xd', 'x.w@mail.co', 'Paq1.....', 8754623787, 'none');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `idx_appointment_pet` (`pet_id`) USING BTREE,
  ADD KEY `idx_appointment_available` (`available_id`);

--
-- Indices de la tabla `available`
--
ALTER TABLE `available`
  ADD PRIMARY KEY (`available_id`),
  ADD KEY `idx_available_schedule` (`schedule_id`),
  ADD KEY `idx_available_veterinarian` (`veterinarian_document`);

--
-- Indices de la tabla `clinic_administrator`
--
ALTER TABLE `clinic_administrator`
  ADD PRIMARY KEY (`document`),
  ADD UNIQUE KEY `idx_clinic_administrator_email` (`email`) INVISIBLE,
  ADD UNIQUE KEY `idx_clinic_administrator_phone_number` (`phone_number`);

--
-- Indices de la tabla `medical_history`
--
ALTER TABLE `medical_history`
  ADD PRIMARY KEY (`medical_history_id`),
  ADD UNIQUE KEY `idx_medical_history_pet` (`pet_id`);

--
-- Indices de la tabla `medical_history_vaccine`
--
ALTER TABLE `medical_history_vaccine`
  ADD PRIMARY KEY (`medical_history_id`,`vaccine_id`),
  ADD KEY `idx_vaccine` (`vaccine_id`);

--
-- Indices de la tabla `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`medicine_id`),
  ADD UNIQUE KEY `idx_medicine_name` (`name`);

--
-- Indices de la tabla `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`pet_id`),
  ADD KEY `idx_pet_owner` (`pet_owner_document`) INVISIBLE;

--
-- Indices de la tabla `pet_owner`
--
ALTER TABLE `pet_owner`
  ADD PRIMARY KEY (`document`),
  ADD UNIQUE KEY `idx_email` (`email`) INVISIBLE;

--
-- Indices de la tabla `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indices de la tabla `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`treatment_id`),
  ADD KEY `idx_treatment_medicine` (`medicine_id`),
  ADD KEY `FK` (`medical_history_id`,`medicine_id`) USING BTREE;

--
-- Indices de la tabla `vaccine`
--
ALTER TABLE `vaccine`
  ADD PRIMARY KEY (`vaccine_id`);

--
-- Indices de la tabla `veterinarian`
--
ALTER TABLE `veterinarian`
  ADD PRIMARY KEY (`document`),
  ADD UNIQUE KEY `idx_veterinarian_email` (`email`,`phone_number`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `available`
--
ALTER TABLE `available`
  MODIFY `available_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medical_history`
--
ALTER TABLE `medical_history`
  MODIFY `medical_history_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `medicine`
--
ALTER TABLE `medicine`
  MODIFY `medicine_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1257;

--
-- AUTO_INCREMENT de la tabla `pet`
--
ALTER TABLE `pet`
  MODIFY `pet_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `treatment`
--
ALTER TABLE `treatment`
  MODIFY `treatment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `vaccine`
--
ALTER TABLE `vaccine`
  MODIFY `vaccine_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `fk_appointment_available` FOREIGN KEY (`available_id`) REFERENCES `available` (`available_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_appointment_pet` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `available`
--
ALTER TABLE `available`
  ADD CONSTRAINT `fk_available_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_available_veterinarian` FOREIGN KEY (`veterinarian_document`) REFERENCES `veterinarian` (`document`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `medical_history`
--
ALTER TABLE `medical_history`
  ADD CONSTRAINT `fk_medical_history_pet` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `medical_history_vaccine`
--
ALTER TABLE `medical_history_vaccine`
  ADD CONSTRAINT `fk_medical_history` FOREIGN KEY (`medical_history_id`) REFERENCES `medical_history` (`medical_history_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_vaccine` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccine` (`vaccine_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pet`
--
ALTER TABLE `pet`
  ADD CONSTRAINT `fk_pet_owner` FOREIGN KEY (`pet_owner_document`) REFERENCES `pet_owner` (`document`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `treatment`
--
ALTER TABLE `treatment`
  ADD CONSTRAINT `fk_treatment_medical_history` FOREIGN KEY (`medical_history_id`) REFERENCES `medical_history` (`medical_history_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_treatment_medicine` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`medicine_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
