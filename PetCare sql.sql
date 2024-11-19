CREATE TABLE appointment (
    appointment_id        INT AUTO_INCREMENT PRIMARY KEY,
    date                  DATE NOT NULL,
    start_time            DATE NOT NULL,
    end_time              DATE NOT NULL,
    pet_pet_id            INTEGER(3) NOT NULL,
    veterinarian_document VARCHAR(10) NOT NULL
);

CREATE TABLE clinic_administrator (
    document     VARCHAR(10) NOT NULL PRIMARY KEY,
    name         VARCHAR(50) NOT NULL,
    last_name    VARCHAR(50) NOT NULL,
    email        VARCHAR(100) NOT NULL,
    password     VARCHAR(50) NOT NULL,
    phone_number BIGINT NOT NULL
);

CREATE TABLE medical_history (
    medical_history_id INT AUTO_INCREMENT PRIMARY KEY,
    diagnosis          VARCHAR(100) NOT NULL,
    pet_pet_id         INTEGER(3) NOT NULL
);

CREATE UNIQUE INDEX medical_history__idx ON
    medical_history (
        pet_pet_id
    ASC );

CREATE TABLE medicine (
    medicine_id INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    stock       INT NOT NULL
);

CREATE TABLE pet (
    pet_id             INT AUTO_INCREMENT PRIMARY KEY,
    name               VARCHAR(50) NOT NULL,
    species            VARCHAR(50) NOT NULL,
    age                INTEGER(3) NOT NULL,
    weight             INTEGER(3) NOT NULL,
    photo              BLOB NOT NULL,
    pet_owner_document VARCHAR(10) NOT NULL
);

CREATE TABLE pet_owner (
    document     VARCHAR(10) NOT NULL PRIMARY KEY,
    name         VARCHAR(50) NOT NULL,
    last_name    VARCHAR(50) NOT NULL,
    email        VARCHAR(100) NOT NULL,
    password     VARCHAR(50) NOT NULL,
    phone_number BIGINT NOT NULL
);

CREATE TABLE medical_history_vaccine ( 
    medical_history_medical_history_id INT,
    vaccine_vaccine_id                 INT,
    PRIMARY KEY ( medical_history_medical_history_id, vaccine_vaccine_id )
);

CREATE TABLE schedule (
    schedule_id           INT AUTO_INCREMENT PRIMARY KEY,
    start_hour            DATE NOT NULL,
    end_hour              DATE NOT NULL,
    veterinarian_document VARCHAR(10) NOT NULL
);

CREATE UNIQUE INDEX schedule__idx ON
    schedule (
        veterinarian_document
    ASC );

CREATE TABLE treatment (
    treatment_id                       INT AUTO_INCREMENT PRIMARY KEY,
    details                            VARCHAR(300) NOT NULL, 
    medical_history_medical_history_id INTEGER(3) NOT NULL,
    medicine_medicine_id               INTEGER(3) NOT NULL,
    dose                               INTEGER(3) NOT NULL
);

CREATE TABLE vaccine (
    vaccine_id INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(50) NOT NULL
);

CREATE TABLE veterinarian (
    document     VARCHAR(10) NOT NULL PRIMARY KEY,
    name         VARCHAR(50) NOT NULL,
    last_name    VARCHAR(50) NOT NULL,
    email        VARCHAR(100) NOT NULL,
    password     VARCHAR(50) NOT NULL,
    phone_number BIGINT NOT NULL
);

ALTER TABLE appointment
    ADD CONSTRAINT appointment_pet_fk FOREIGN KEY ( pet_pet_id )
        REFERENCES pet ( pet_id );

ALTER TABLE appointment
    ADD CONSTRAINT appointment_veterinarian_fk FOREIGN KEY ( veterinarian_document )
        REFERENCES veterinarian ( document );

ALTER TABLE medical_history
    ADD CONSTRAINT medical_history_pet_fk FOREIGN KEY ( pet_pet_id )
        REFERENCES pet ( pet_id );

ALTER TABLE pet
    ADD CONSTRAINT pet_pet_owner_fk FOREIGN KEY ( pet_owner_document )
        REFERENCES pet_owner ( document );

ALTER TABLE medical_history_vaccine
    ADD CONSTRAINT medical_history_vaccine_medical_history_fk FOREIGN KEY ( medical_history_medical_history_id )
        REFERENCES medical_history ( medical_history_id );

ALTER TABLE medical_history_vaccine
    ADD CONSTRAINT medical_history_vaccine_vaccine_fk FOREIGN KEY ( vaccine_vaccine_id )
        REFERENCES vaccine ( vaccine_id );

ALTER TABLE schedule
    ADD CONSTRAINT schedule_veterinarian_fk FOREIGN KEY ( veterinarian_document )
        REFERENCES veterinarian ( document );

ALTER TABLE treatment
    ADD CONSTRAINT treatment_medical_history_fk FOREIGN KEY ( medical_history_medical_history_id )
        REFERENCES medical_history ( medical_history_id );

ALTER TABLE treatment
    ADD CONSTRAINT treatment_medicine_fk FOREIGN KEY ( medicine_medicine_id )
        REFERENCES medicine ( medicine_id );
