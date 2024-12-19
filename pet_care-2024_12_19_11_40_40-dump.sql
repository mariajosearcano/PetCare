-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: junction.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `day` date DEFAULT NULL,
  `start_hour` time DEFAULT NULL,
  `end_hour` time DEFAULT NULL,
  `pet_id` int NOT NULL,
  `available_id` int DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  UNIQUE KEY `idx_appointment_day_pet_id` (`day`,`pet_id`),
  KEY `idx_appointment_pet` (`pet_id`) USING BTREE,
  KEY `idx_appointment_available` (`available_id`),
  CONSTRAINT `fk_appointment_available` FOREIGN KEY (`available_id`) REFERENCES `available` (`available_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_appointment_pet` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50032 DROP TRIGGER IF EXISTS update_status_after_insert */;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `update_status_after_insert` AFTER INSERT ON `appointment` FOR EACH ROW BEGIN
	UPDATE available
    SET status = 'scheduled'
    WHERE available_id = NEW.available_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50032 DROP TRIGGER IF EXISTS check cancel date */;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `check cancel date` BEFORE DELETE ON `appointment` FOR EACH ROW BEGIN
	IF DATEDIFF(OLD.day, CURDATE()) < 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cancellation must be made at least 1 day before the appointment date';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50032 DROP TRIGGER IF EXISTS update_status_after_delete */;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `update_status_after_delete` AFTER DELETE ON `appointment` FOR EACH ROW BEGIN
	UPDATE available
    SET status = 'available'
    WHERE available_id = OLD.available_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `available`
--

DROP TABLE IF EXISTS `available`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `available` (
  `available_id` int NOT NULL AUTO_INCREMENT,
  `day` date NOT NULL,
  `start_hour` time DEFAULT NULL,
  `end_hour` time DEFAULT NULL,
  `status` set('available','scheduled') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'available',
  `veterinarian_document` varchar(10) NOT NULL,
  `schedule_id` int DEFAULT NULL,
  PRIMARY KEY (`available_id`),
  KEY `idx_available_schedule` (`schedule_id`),
  KEY `idx_available_veterinarian` (`veterinarian_document`),
  CONSTRAINT `fk_available_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_available_veterinarian` FOREIGN KEY (`veterinarian_document`) REFERENCES `veterinarian` (`document`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clinic_administrator`
--

DROP TABLE IF EXISTS `clinic_administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinic_administrator` (
  `document` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` bigint NOT NULL,
  PRIMARY KEY (`document`),
  UNIQUE KEY `idx_clinic_administrator_email` (`email`) /*!80000 INVISIBLE */,
  UNIQUE KEY `idx_clinic_administrator_phone_number` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_history`
--

DROP TABLE IF EXISTS `medical_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_history` (
  `medical_history_id` int NOT NULL AUTO_INCREMENT,
  `diagnosis` varchar(100) NOT NULL,
  `pet_id` int NOT NULL,
  PRIMARY KEY (`medical_history_id`),
  UNIQUE KEY `idx_medical_history_pet` (`pet_id`),
  CONSTRAINT `fk_medical_history_pet` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_history_vaccine`
--

DROP TABLE IF EXISTS `medical_history_vaccine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_history_vaccine` (
  `medical_history_id` int NOT NULL,
  `vaccine_id` int NOT NULL,
  PRIMARY KEY (`medical_history_id`,`vaccine_id`),
  KEY `idx_vaccine` (`vaccine_id`),
  CONSTRAINT `fk_medical_history` FOREIGN KEY (`medical_history_id`) REFERENCES `medical_history` (`medical_history_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vaccine` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccine` (`vaccine_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine` (
  `medicine_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`medicine_id`),
  UNIQUE KEY `idx_medicine_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1257 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `pet_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `species` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `age` int NOT NULL,
  `weight` float NOT NULL,
  `photo_url` varchar(1000) DEFAULT NULL COMMENT 'EMPTY',
  `pet_owner_document` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`pet_id`),
  UNIQUE KEY `uk_name_pet_owner_document` (`name`,`pet_owner_document`),
  KEY `idx_pet_owner` (`pet_owner_document`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_pet_owner` FOREIGN KEY (`pet_owner_document`) REFERENCES `pet_owner` (`document`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pet_owner`
--

DROP TABLE IF EXISTS `pet_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_owner` (
  `document` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone_number` bigint NOT NULL,
  PRIMARY KEY (`document`),
  UNIQUE KEY `idx_email` (`email`) /*!80000 INVISIBLE */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `start_day` date NOT NULL,
  `end_day` date NOT NULL,
  `start_hour` time NOT NULL,
  `end_hour` time NOT NULL,
  PRIMARY KEY (`schedule_id`),
  UNIQUE KEY `start_day` (`start_day`,`end_day`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
/*!50032 DROP TRIGGER IF EXISTS after_insert_schedule */;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `after_insert_schedule` AFTER INSERT ON `schedule` FOR EACH ROW BEGIN
    DECLARE v_current_date DATE;
    DECLARE v_end_date DATE;
    DECLARE v_current_start_hour TIME;
    DECLARE v_current_end_hour TIME;
    DECLARE v_current_vet_document VARCHAR(10);
    DECLARE v_done INT DEFAULT 0;

    -- Cursor to select veterinarian documents randomly
    DECLARE vet_cursor CURSOR FOR 
        SELECT document 
        FROM veterinarian
        ORDER BY RAND();
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;

    SET v_current_date = NEW.start_day;
    SET v_end_date = NEW.end_day;
    SET v_current_start_hour = NEW.start_hour;
    SET v_current_end_hour = NEW.end_hour;

    OPEN vet_cursor;

    date_loop: WHILE v_current_date <= v_end_date DO
        -- Fetch a random veterinarian document
        FETCH vet_cursor INTO v_current_vet_document;
        
        -- Reset cursor if we've gone through all vets
        IF v_done THEN
            CLOSE vet_cursor;
            OPEN vet_cursor;
            SET v_done = 0;
            FETCH vet_cursor INTO v_current_vet_document;
        END IF;

        WHILE v_current_start_hour < v_current_end_hour DO
            INSERT INTO available (
                schedule_id, 
                veterinarian_document, 
                day,  -- Changed from 'date' to 'day'
                start_hour, 
                end_hour, 
                status
            ) VALUES (
                NEW.schedule_id,
                v_current_vet_document,
                v_current_date,
                v_current_start_hour,
                ADDTIME(v_current_start_hour, '00:30:00'),
                'available'
            );

            SET v_current_start_hour = ADDTIME(v_current_start_hour, '00:30:00');
        END WHILE;

        SET v_current_start_hour = NEW.start_hour;
        SET v_current_date = DATE_ADD(v_current_date, INTERVAL 1 DAY);
    END WHILE date_loop;

    CLOSE vet_cursor;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50032 DROP TRIGGER IF EXISTS after_update_schedule */;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `after_update_schedule` AFTER UPDATE ON `schedule` FOR EACH ROW BEGIN
    -- Variables para el control de fechas y horas
    DECLARE v_current_date DATE;
    DECLARE v_current_start_hour TIME;
    DECLARE v_done INT DEFAULT 0;
    DECLARE v_vet_count INT;
    DECLARE v_current_vet_index INT DEFAULT 0;
    DECLARE v_current_vet_document VARCHAR(10);
    
    -- Cursor para mantener los mismos veterinarios en orden
    DECLARE vet_cursor CURSOR FOR
        SELECT DISTINCT veterinarian_document 
        FROM available 
        WHERE schedule_id = OLD.schedule_id;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;
    
    -- Si cambiaron las fechas o las horas
    IF OLD.start_day != NEW.start_day OR 
       OLD.end_day != NEW.end_day OR 
       OLD.start_hour != NEW.start_hour OR 
       OLD.end_hour != NEW.end_hour THEN
       
        -- Obtener cantidad de veterinarios distintos
        SELECT COUNT(DISTINCT veterinarian_document) 
        INTO v_vet_count
        FROM available 
        WHERE schedule_id = OLD.schedule_id;
        
        IF v_vet_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No hay veterinarios asociados al schedule_id especificado.';
        END IF;
        
        -- Abrir cursor de veterinarios
        OPEN vet_cursor;

        -- Ahora elimina los registros
        DELETE FROM available WHERE schedule_id = OLD.schedule_id;
        
        SET v_current_date = NEW.start_day;
        
        -- Iteración por fechas
        date_loop: WHILE v_current_date <= NEW.end_day DO
            SET v_current_start_hour = NEW.start_hour;
            SET v_current_vet_index = 0;
            
            -- Resetear cursor cuando sea necesario
            IF v_done THEN
                CLOSE vet_cursor;
                OPEN vet_cursor;
                SET v_done = 0;
            END IF;
            
            -- Iteración por horas
            WHILE v_current_start_hour < NEW.end_hour DO
                -- Obtener siguiente veterinario
                FETCH vet_cursor INTO v_current_vet_document;

                IF v_current_vet_document IS NULL THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'El cursor devolvió un valor NULL para veterinarian_document';
                END IF;
                
                -- Si no hay más veterinarios, volver al inicio
                IF v_done THEN
                    CLOSE vet_cursor;
                    OPEN vet_cursor;
                    FETCH vet_cursor INTO v_current_vet_document;
                    SET v_done = 0;
                END IF;
                
                -- Insertar nuevo registro available
                INSERT INTO available (
                    schedule_id,
                    veterinarian_document,
                    day,
                    start_hour,
                    end_hour,
                    status
                ) VALUES (
                    NEW.schedule_id,
                    v_current_vet_document,
                    v_current_date,
                    v_current_start_hour,
                    ADDTIME(v_current_start_hour, '00:30:00'),
                    'available'
                );
                
                SET v_current_start_hour = ADDTIME(v_current_start_hour, '00:30:00');
            END WHILE;
            
            SET v_current_date = DATE_ADD(v_current_date, INTERVAL 1 DAY);
        END WHILE date_loop;
        
        CLOSE vet_cursor;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `treatment`
--

DROP TABLE IF EXISTS `treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment` (
  `treatment_id` int NOT NULL AUTO_INCREMENT,
  `medical_history_id` int NOT NULL,
  `medicine_id` int NOT NULL,
  `medicine_type` set('lozenge','syringe','pomade','drop') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `dose` float NOT NULL,
  PRIMARY KEY (`treatment_id`),
  KEY `idx_treatment_medicine` (`medicine_id`),
  KEY `FK` (`medical_history_id`,`medicine_id`) USING BTREE,
  CONSTRAINT `fk_treatment_medical_history` FOREIGN KEY (`medical_history_id`) REFERENCES `medical_history` (`medical_history_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_treatment_medicine` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`medicine_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vaccine`
--

DROP TABLE IF EXISTS `vaccine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine` (
  `vaccine_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`vaccine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `veterinarian`
--

DROP TABLE IF EXISTS `veterinarian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinarian` (
  `document` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` bigint NOT NULL,
  `specialty` set('dermatologist','cardiologist','endocrinologist','gastroenterologist','neurologist','none') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'none',
  PRIMARY KEY (`document`),
  UNIQUE KEY `idx_veterinarian_email` (`email`,`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'railway'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-19 11:41:15
