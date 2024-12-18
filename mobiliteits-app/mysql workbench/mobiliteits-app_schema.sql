CREATE SCHEMA IF NOT EXISTS `test_mobiliteits-app`;

USE `test_mobiliteits-app`;

CREATE TABLE IF NOT EXISTS `journey_type` (
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`name`)
);

INSERT IGNORE INTO `journey_type` (`name`) VALUES ('Commuting'), ('Business');

CREATE TABLE IF NOT EXISTS `account_type` (
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`name`)
);

INSERT IGNORE INTO `account_type` (`name`) VALUES ('User'), ('Admin');

CREATE TABLE IF NOT EXISTS `account` (
  `email` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(50) NOT NULL,
  `tussenvoegsel` VARCHAR(50) NULL DEFAULT NULL,
  `lastname` VARCHAR(50) NOT NULL,
  `account_type_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`email`),
    FOREIGN KEY (`account_type_name`)
    REFERENCES `account_type` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `password` (
  `hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`hash`, `email`),
    FOREIGN KEY (`email`)
    REFERENCES `account` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `transport_type` (
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`name`)
);

INSERT IGNORE INTO `transport_type` (`name`) VALUES ('Walking'), ('Cycling'), ('Car'), ('Bus'), ('Train'), ('Metro'), ('Plane'), ('Boat');

CREATE TABLE IF NOT EXISTS `journey` (
  `journey_date` DATE NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `journey_type_name` VARCHAR(50) NOT NULL,
  `address_from` VARCHAR(255) NULL,
  `address_to` VARCHAR(255) NULL,
  `kilometers` DECIMAL(10,2) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `transport_type_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`created_at`, `email`),
    FOREIGN KEY (`email`)
    REFERENCES `account` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`journey_type_name`)
    REFERENCES `journey_type` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`transport_type_name`)
    REFERENCES `transport_type` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `car` (
  `license_plate` VARCHAR(20) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `brand` VARCHAR(100) NOT NULL,
  `transmission` VARCHAR(50) NOT NULL,
  `mileage` INT NOT NULL,
  `build_year` INT NOT NULL,
  `fuel_type` VARCHAR(50) NOT NULL,
  `carImage` Text
  PRIMARY KEY (`license_plate`)
);

CREATE TABLE IF NOT EXISTS `vehicle_journey` (
  `journey_created_at` TIMESTAMP NOT NULL,
  `journey_email` VARCHAR(255) NOT NULL,
  `car_license_plate` VARCHAR(20) NULL,
  `passengers` INT NOT NULL,
  `fuel_type` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`journey_email`, `journey_created_at`),
    FOREIGN KEY (`journey_created_at` , `journey_email`)
    REFERENCES `journey` (`created_at` , `email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`car_license_plate`)
    REFERENCES `car` (`license_plate`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `rental` (
  `email` VARCHAR(255) NOT NULL,
  `rental_date` DATE NOT NULL,
  `date_of_return` DATE NULL DEFAULT NULL,
  `license_plate` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`email`, `rental_date`, `license_plate`),
    FOREIGN KEY (`email`)
    REFERENCES `account` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`license_plate`)
    REFERENCES `car` (`license_plate`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
