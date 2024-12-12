
DELIMITER //

CREATE TRIGGER after_insert_schedule 
AFTER INSERT ON schedule 
FOR EACH ROW 
BEGIN
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
END;//

DELIMITER ;



DELIMITER //

CREATE TRIGGER after_update_schedule
AFTER UPDATE ON schedule
FOR EACH ROW
BEGIN
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
END;//

DELIMITER ;