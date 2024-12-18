USE `mobiliteits-app`;

INSERT INTO `account` (`email`, `firstname`, `tussenvoegsel`, `lastname`, `account_type_name`) VALUES 
('user1@example.com', 'John', NULL, 'Doe', 'User'),
('user2@example.com', 'Alice', NULL, 'Smith', 'User'),
('user3@example.com', 'Bob', NULL, 'Johnson', 'User'),
('user4@example.com', 'Emily', NULL, 'Brown', 'User'),
('user5@example.com', 'David', NULL, 'Wilson', 'User'),
('user6@example.com', 'Sarah', NULL, 'Martinez', 'User'),
('user7@example.com', 'Michael', NULL, 'Taylor', 'User'),
('user8@example.com', 'Emma', NULL, 'Anderson', 'User'),
('admin1@example.com', 'Admin', NULL, 'One', 'Admin'),
('admin2@example.com', 'Admin', NULL, 'Two', 'Admin');

INSERT INTO `car` (`license_plate`, `model`, `brand`, `transmission`, `mileage`, `build_year`, `fuel_type`) VALUES 
('ABC123', 'Civic', 'Honda', 'Automatic', 50000, 2020, 'Petrol'),
('DEF456', 'Corolla', 'Toyota', 'Manual', 60000, 2018, 'Petrol'),
('GHI789', 'Model 3', 'Tesla', 'Automatic', 20000, 2021, 'Electric'),
('JKL012', 'Golf', 'Volkswagen', 'Manual', 70000, 2017, 'Diesel'),
('MNO345', 'C-Class', 'Mercedes-Benz', 'Automatic', 40000, 2019, 'Petrol'),
('PQR678', '3 Series', 'BMW', 'Automatic', 45000, 2020, 'Diesel'),
('STU901', 'Camry', 'Toyota', 'Automatic', 55000, 2018, 'Petrol'),
('VWX234', 'Fiesta', 'Ford', 'Manual', 80000, 2016, 'Petrol'),
('YZA567', 'A4', 'Audi', 'Automatic', 60000, 2019, 'Diesel'),
('BCD890', 'CR-V', 'Honda', 'Automatic', 50000, 2019, 'Petrol'),
('EFG123', 'Tiguan', 'Volkswagen', 'Automatic', 55000, 2018, 'Diesel'),
('HIJ456', 'Model S', 'Tesla', 'Automatic', 25000, 2021, 'Electric'),
('KLM789', 'A3', 'Audi', 'Manual', 70000, 2017, 'Petrol'),
('NOP012', 'Cayenne', 'Porsche', 'Automatic', 35000, 2020, 'Petrol'),
('PQR345', 'X5', 'BMW', 'Automatic', 40000, 2019, 'Diesel'),
('STU678', 'F-Pace', 'Jaguar', 'Automatic', 30000, 2020, 'Petrol'),
('VWX901', 'Q5', 'Audi', 'Automatic', 45000, 2018, 'Diesel'),
('YZA234', 'XC90', 'Volvo', 'Automatic', 50000, 2019, 'Petrol'),
('BCD567', 'Range Rover', 'Land Rover', 'Automatic', 35000, 2020, 'Petrol'),
('EFG890', '911', 'Porsche', 'Automatic', 30000, 2020, 'Petrol'),
('HIJ123', 'Mustang', 'Ford', 'Manual', 60000, 2018, 'Petrol'),
('KLM456', 'AMG GT', 'Mercedes-Benz', 'Automatic', 25000, 2021, 'Petrol'),
('NOP789', 'Charger', 'Dodge', 'Automatic', 40000, 2019, 'Petrol');

INSERT INTO `journey` (`journey_date`, `email`, `created_at`, `journey_type_name`, `address_from`, `address_to`, `kilometers`, `price`, `transport_type_name`) VALUES 
('2024-04-01', 'user1@example.com', NOW(), 'Commuting', '123 Main St', '456 Elm St', 20.5, 15.75, 'Car'),
('2024-04-02', 'user2@example.com', NOW(), 'Business', '789 Oak St', '101 Pine St', 30.2, 25.50, 'Bus'),
('2024-04-03', 'user3@example.com', NOW(), 'Commuting', '222 Maple St', '333 Cedar St', 15.8, 10.25, 'Train'),
('2024-04-04', 'user4@example.com', NOW(), 'Commuting', '444 Walnut St', '555 Birch St', 25.3, 20.00, 'Car'),
('2024-04-05', 'user5@example.com', NOW(), 'Business', '666 Pine St', '777 Elm St', 18.9, 14.25, 'Plane'),
('2024-04-06', 'user6@example.com', NOW(), 'Commuting', '888 Oak St', '999 Maple St', 22.7, 18.75, 'Metro'),
('2024-04-07', 'user7@example.com', NOW(), 'Business', '111 Cedar St', '222 Birch St', 12.4, 9.00, 'Car'),
('2024-04-08', 'user8@example.com', NOW(), 'Commuting', '333 Walnut St', '444 Pine St', 27.6, 0, 'Walking');
