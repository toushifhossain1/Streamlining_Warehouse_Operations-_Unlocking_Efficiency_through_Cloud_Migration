-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2024 at 04:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wms`
--

-- --------------------------------------------------------

--
-- Table structure for table `warehouseonedata`
--

CREATE TABLE `warehouseonedata` (
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `EncryptedData` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warehouseonedata`
--

INSERT INTO `warehouseonedata` (`timestamp`, `EncryptedData`) VALUES
('2024-01-10 19:30:46', '!x?7*?(;./(?x`hitjjvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\''),
('2024-01-10 19:31:16', '!x?7*?(;./(?x`hitjjvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\''),
('2024-01-10 19:31:46', '!x?7*?(;./(?x`hitjjvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\''),
('2024-01-10 19:32:16', '!x?7*?(;./(?x`hitjjvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\''),
('2024-01-10 19:32:46', '!x?7*?(;./(?x`hitjjvx/73>3.#x`mktjjvx=;);6/?x`mhtjj\''),
('2024-01-10 19:33:16', '!x?7*?(;./(?x`hitjjvx/73>3.#x`mktjjvx=;);6/?x`mitjj\''),
('2024-01-10 19:33:46', '!x?7*?(;./(?x`hitjjvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\''),
('2024-01-10 19:34:16', '!x?7*?(;./(?x`hitkjvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\''),
('2024-01-10 19:34:46', '!x?7*?(;./(?x`hitijvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\''),
('2024-01-10 19:35:16', '!x?7*?(;./(?x`hitnjvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\''),
('2024-01-10 19:35:46', '!x?7*?(;./(?x`hitnjvx/73>3.#x`mktjjvx=;);6/?x`mjtjj\'');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `warehouseonedata`
--
ALTER TABLE `warehouseonedata`
  ADD PRIMARY KEY (`timestamp`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
