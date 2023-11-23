-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: zone_clocker
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_company` int NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `id_company_idx` (`id_company`),
  CONSTRAINT `fk_admin_id_company` FOREIGN KEY (`id_company`) REFERENCES `company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'nico','nico@gmail.com','$2a$10$MWvT7azsgNH9cuxPn8DmWeMFv5tbVpWQA5w8k1W5mST/wHFVL7lk2',1),(2,'David','david@gmail.com','$2a$10$aqEe0IAQpZBMUFHEQdUNjOQntU83NT2wxbnDuKEuBA3wOItVtHTgy',2),(3,'Catarina','catarina@gmail.com','$2a$10$uaSCa6rCmwgEmW1x2MHnaOUTR0Sy1uA7MaT.0ToOhcTPB9E008H4G',2);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id_company` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id_company`),
  UNIQUE KEY `company_email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Icleangrenn','iclean@gmial.com'),(2,'Freska','fresca@gmail.com');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id_employee` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `id_number` varchar(20) NOT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `zone` varchar(100) DEFAULT NULL,
  `id_company` int NOT NULL,
  `is_active` tinyint NOT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `id_zone` int DEFAULT NULL,
  PRIMARY KEY (`id_employee`),
  UNIQUE KEY `id_number_UNIQUE` (`id_number`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mobile_number_UNIQUE` (`mobile_number`),
  KEY `id_company_idx` (`id_company`),
  CONSTRAINT `fk_employee_id_company` FOREIGN KEY (`id_company`) REFERENCES `company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (48,'Nicolas Cabello','37908587','1993-11-30','nicoc12024@gmail.com','Stockholm, Sweden',2,1,'0735836122',88),(49,'Mia Lund','9999','1996-06-04','example@gmail.com','Stockholm, Sweden',2,1,'4234234234234',88),(56,'aa','aa',NULL,NULL,'',2,1,NULL,NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `id_shift` int NOT NULL AUTO_INCREMENT,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `date` date NOT NULL,
  `id_employee` int NOT NULL,
  `id_zone` int DEFAULT NULL,
  `check_in` time DEFAULT NULL,
  `check_out` time DEFAULT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  PRIMARY KEY (`id_shift`),
  KEY `fk_shift_id_zone_idx` (`id_zone`),
  KEY `fk_shift_id_employee_idx` (`id_employee`),
  CONSTRAINT `fk_shift_id_employee` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id_employee`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_shift_id_zone` FOREIGN KEY (`id_zone`) REFERENCES `zone` (`id_zone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (15,'09:00:00','17:00:00','2023-08-21',48,87,'09:00:00','10:09:09',NULL,NULL),(38,'09:00:00','09:50:00','2023-11-13',48,NULL,'09:39:33','09:39:34','2023-11-21','2023-11-21'),(39,'09:00:00','17:00:00','2023-11-14',48,NULL,'20:05:44','09:01:00','2023-11-20','2023-11-21'),(40,'09:00:00','17:00:00','2023-11-15',48,NULL,'09:01:43','09:03:58','2023-11-21','2023-11-21'),(41,'09:00:00','17:00:00','2023-11-16',48,NULL,'12:29:44','09:03:59','2023-11-20','2023-11-21'),(43,'09:00:00','17:00:00','2023-11-13',49,NULL,NULL,NULL,NULL,NULL),(44,'09:00:00','17:00:00','2023-11-14',49,NULL,NULL,NULL,NULL,NULL),(45,'09:00:00','17:00:00','2023-11-15',49,NULL,NULL,NULL,NULL,NULL),(46,'09:00:00','17:00:00','2023-11-16',49,NULL,NULL,NULL,NULL,NULL),(52,'09:09:00','08:08:00','2023-11-13',56,NULL,NULL,NULL,NULL,NULL),(53,'09:59:00','09:59:00','2023-11-21',48,NULL,'09:25:10','09:25:30','2023-11-21','2023-11-21');
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone`
--

DROP TABLE IF EXISTS `zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zone` (
  `id_zone` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `radius` float NOT NULL,
  `id_company` int NOT NULL,
  PRIMARY KEY (`id_zone`),
  KEY `fk_zone_id_company_idx` (`id_company`),
  CONSTRAINT `fk_zone_id_company` FOREIGN KEY (`id_company`) REFERENCES `company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone`
--

LOCK TABLES `zone` WRITE;
/*!40000 ALTER TABLE `zone` DISABLE KEYS */;
INSERT INTO `zone` VALUES (87,'Lisbon, Portugal',38.71304082372409,-9.13458824332338,200,2),(88,'Stockholm, Sweden',59.25583111015165,18.011140824673934,1000,2);
/*!40000 ALTER TABLE `zone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-22 11:17:36
