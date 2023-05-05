-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 21, 2022 at 06:16 AM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mohammed`
--

-- --------------------------------------------------------

--
-- Table structure for table `accuont`
--

CREATE TABLE IF NOT EXISTS `accuont` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text,
  `password` text NOT NULL,
  `IdType_user` int(11) NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `IdType_user` (`IdType_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=231 ;

--
-- Dumping data for table `accuont`
--

INSERT INTO `accuont` (`account_id`, `username`, `password`, `IdType_user`) VALUES
(48, 'rr', 'rr', 1),
(201, 'mohammed', '613720', 3),
(202, 'emp@gmail.com', '12345', 3),
(221, '2022743', 'aas.com', 2),
(222, '2022744', 'tuyysu.com', 2),
(223, '2022745', 'tuyysu.com', 2),
(224, '2022746', 'tuyysu', 2),
(225, '2022747', 'aas.com', 2),
(226, '2022748', '  mkkj.com', 2),
(227, '2022749', 'tuyysu', 2),
(228, '2022750', 'tuyysu.com', 2),
(229, '2022751', 'tuyysu.com', 2),
(230, '2022752', 'aas', 2);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `useradmin` varchar(255) NOT NULL,
  `passadmin` varchar(255) NOT NULL,
  `account_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `useradmin`, `passadmin`, `account_id`) VALUES
(62, 'rr', 'rr', 48);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `classid` int(11) NOT NULL AUTO_INCREMENT,
  `ClassName` varchar(50) NOT NULL,
  PRIMARY KEY (`classid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`classid`, `ClassName`) VALUES
(1, 'firset'),
(2, 'scand'),
(3, 'therd'),
(4, 'fore'),
(5, 'five'),
(9, '');

-- --------------------------------------------------------

--
-- Table structure for table `colia`
--

CREATE TABLE IF NOT EXISTS `colia` (
  `col_id` int(11) NOT NULL AUTO_INCREMENT,
  `col_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`col_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `colia`
--

INSERT INTO `colia` (`col_id`, `col_name`) VALUES
(1, 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø·Ø¨ '),
(2, 'ÙƒÙ„ÙŠÙ€Ù€Ø© Ø§Ù„Ù‡Ù†Ø¯Ø³Ø© ÙˆØªÙ‚Ù†ÙŠØ© Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª'),
(3, 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø§Ø¯Ø§Ø±ÙŠØ©'),
(4, 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø§Ù†Ø³Ø§Ù†ÙŠØ©');

-- --------------------------------------------------------

--
-- Table structure for table `degry`
--

CREATE TABLE IF NOT EXISTS `degry` (
  `degry_id` int(11) NOT NULL AUTO_INCREMENT,
  `col_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `classid` int(11) NOT NULL,
  `TermS_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `deg_perseverance` int(3) NOT NULL,
  `deg_nashat` int(3) NOT NULL,
  `deg_half` int(3) NOT NULL,
  `deg_duties` int(3) NOT NULL,
  `deg_final` int(3) NOT NULL,
  `sum_degry` int(11) NOT NULL,
  `astim` varchar(30) NOT NULL,
  `stu_id` int(11) NOT NULL,
  PRIMARY KEY (`degry_id`),
  KEY `col_id` (`col_id`),
  KEY `dept_id` (`dept_id`),
  KEY `classid` (`classid`),
  KEY `TermS_id` (`TermS_id`),
  KEY `subject_id` (`subject_id`),
  KEY `stu_id` (`stu_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=160 ;

--
-- Dumping data for table `degry`
--

INSERT INTO `degry` (`degry_id`, `col_id`, `dept_id`, `classid`, `TermS_id`, `subject_id`, `deg_perseverance`, `deg_nashat`, `deg_half`, `deg_duties`, `deg_final`, `sum_degry`, `astim`, `stu_id`) VALUES
(131, 2, 26, 1, 1, 64, 7, 9, 12, 21, 23, 0, '', 743),
(133, 2, 26, 1, 1, 65, 6, 9, 14, 23, 14, 0, '', 743),
(135, 2, 26, 1, 1, 76, 9, 7, 14, 14, 23, 0, '', 743),
(137, 2, 26, 1, 1, 148, 7, 9, 12, 23, 29, 0, '', 743),
(139, 2, 26, 1, 1, 57, 9, 7, 23, 23, 23, 0, '', 743),
(141, 2, 27, 1, 1, 64, 7, 9, 7, 14, 26, 0, '', 744),
(142, 2, 27, 1, 1, 64, 9, 3, 2, 5, 1, 0, '', 747),
(143, 2, 27, 1, 1, 57, 8, 9, 23, 23, 25, 0, '', 744),
(144, 2, 27, 1, 1, 57, 9, 6, 24, 27, 28, 0, '', 747),
(145, 2, 27, 1, 1, 65, 9, 7, 23, 27, 26, 0, '', 744),
(146, 2, 27, 1, 1, 65, 9, 6, 25, 37, 14, 0, '', 747),
(147, 3, 10, 1, 1, 90, 8, 9, 23, 24, 23, 0, '', 749),
(148, 3, 10, 1, 1, 90, 0, 0, 0, 0, 0, 0, '', 750),
(159, 2, 26, 1, 1, 64, 0, 0, 0, 0, 0, 0, '', 746);

-- --------------------------------------------------------

--
-- Table structure for table `dept`
--

CREATE TABLE IF NOT EXISTS `dept` (
  `dept_id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(100) NOT NULL,
  `col_id` int(11) NOT NULL,
  PRIMARY KEY (`dept_id`),
  KEY `col_id` (`col_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `dept`
--

INSERT INTO `dept` (`dept_id`, `dept_name`, `col_id`) VALUES
(10, 'Ù‚Ø³Ù… Ø§Ù„Ù…Ø­Ø§Ø³Ø¨Ø©', 3),
(11, 'Ù‚Ø³Ù… Ø§Ø¯Ø§Ø±Ø© Ø§Ù„Ø§Ø¹Ù…Ø§Ù„', 3),
(13, 'ØªØ³ÙˆÙŠÙ‚', 3),
(14, 'Ø§Ø¯Ø§Ø±Ø© Ø¯ÙˆÙ„ÙŠØ©', 3),
(15, 'Ø§Ø¯Ø§Ø±Ø© ØµØ­ÙŠØ©', 3),
(16, 'Ø´Ø±ÙŠØ¹Ø© ÙˆÙ‚Ø§Ù†ÙˆÙ†', 4),
(17, 'Ø§Ù„ØªØ±Ø¬Ù…Ø©', 4),
(18, 'Ø¹Ù„ÙˆÙ… Ø§Ù„Ù‚Ø±Ø§Ù†', 4),
(21, 'Ù‚Ø³Ù… Ø·Ø¨ Ø§Ù„Ø§Ø³Ù†Ø§Ù†', 1),
(22, 'Ù‚Ø³Ù… Ø§Ù„Ù…Ø®ØªØ¨Ø±Ø§Øª', 1),
(23, 'Ù‚Ø³Ù… Ø§Ù„ØµÙŠØ¯Ù„Ù‡', 1),
(24, 'Ù‚Ø³Ù… Ø§Ù„ØªÙ…Ø±ÙŠØ¶', 1),
(25, 'Ù‚Ø³Ù… Ø§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø¹Ù„Ø§Ø¬ÙŠØ©', 1),
(26, 'Ù‚Ø³Ù… ØªÙƒÙ†Ù„ÙˆØ¬ÙŠØ§ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª', 2),
(27, 'Ù‚Ø³Ù… Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ø´Ø¨ÙƒØ§Øª ÙˆØ§Ù„Ø§ØªØµØ§Ù„Ø§Øª', 2),
(28, 'Ù‚Ø³Ù… Ø§Ù„Ø¬Ø±Ø§ÙÙƒØ³ ÙˆØ§Ù„Ù…Ù„ØªÙ…ÙŠØ¯ÙŠØ§', 2),
(29, 'Ù‚Ø³Ù… Ø¹Ù„ÙˆÙ… Ø§Ù„Ø­Ø§Ø³ÙˆØ¨', 2),
(30, 'Ù‚Ø³Ù… Ø¯Ø¨Ù„ÙˆÙ… Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', 2);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE IF NOT EXISTS `employee` (
  `emp_id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(50) NOT NULL,
  `date_birth` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `image` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `id_card` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_name`, `date_birth`, `gender`, `image`, `email`, `id_card`, `account_id`) VALUES
(17, 'mohammed', '2022-05-05', 'Male', 'mohammed.png', 'staff1@gmail.com', 123, 201),
(18, 'nader', '2022-05-03', 'Male', 'logic_program.jpg', 'emp@gmail.com', 12345, 202);

-- --------------------------------------------------------

--
-- Table structure for table `free_dept`
--

CREATE TABLE IF NOT EXISTS `free_dept` (
  `freedept_id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`freedept_id`),
  KEY `dept_id` (`dept_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `free_dept`
--

INSERT INTO `free_dept` (`freedept_id`, `dept_id`, `amount`) VALUES
(7, 10, 150000),
(8, 11, 180000),
(9, 13, 220000),
(10, 14, 165000),
(11, 15, 280000),
(12, 16, 210000),
(13, 17, 240000),
(14, 18, 190000),
(15, 21, 170000),
(16, 22, 320000),
(17, 23, 140000),
(18, 24, 130000),
(19, 25, 230000),
(20, 26, 420000),
(21, 27, 330000),
(22, 28, 250000),
(23, 29, 280000),
(25, 18, 60000);

-- --------------------------------------------------------

--
-- Table structure for table `levl_dept`
--

CREATE TABLE IF NOT EXISTS `levl_dept` (
  `levl_id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` int(11) NOT NULL,
  `classid` int(11) NOT NULL,
  PRIMARY KEY (`levl_id`),
  KEY `dept_id` (`dept_id`),
  KEY `classid` (`classid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=102 ;

--
-- Dumping data for table `levl_dept`
--

INSERT INTO `levl_dept` (`levl_id`, `dept_id`, `classid`) VALUES
(12, 10, 1),
(13, 10, 2),
(14, 10, 3),
(15, 10, 4),
(16, 11, 1),
(17, 11, 2),
(18, 11, 3),
(19, 11, 4),
(20, 13, 1),
(21, 13, 2),
(22, 13, 3),
(23, 13, 4),
(24, 14, 1),
(25, 14, 2),
(26, 14, 3),
(27, 14, 4),
(28, 15, 1),
(29, 15, 2),
(30, 15, 3),
(31, 15, 4),
(32, 16, 1),
(33, 16, 2),
(34, 16, 3),
(35, 16, 4),
(36, 17, 1),
(37, 17, 2),
(38, 17, 3),
(39, 17, 4),
(40, 18, 1),
(42, 18, 3),
(43, 18, 4),
(61, 21, 1),
(62, 21, 2),
(63, 21, 3),
(64, 21, 4),
(65, 21, 5),
(66, 22, 1),
(67, 22, 2),
(68, 22, 3),
(69, 22, 4),
(70, 23, 1),
(71, 23, 2),
(72, 23, 3),
(73, 23, 4),
(74, 24, 1),
(75, 24, 2),
(76, 24, 3),
(77, 24, 4),
(78, 25, 1),
(79, 25, 2),
(80, 25, 3),
(81, 25, 4),
(82, 26, 1),
(83, 26, 2),
(84, 26, 3),
(85, 26, 4),
(86, 27, 1),
(87, 27, 2),
(88, 27, 3),
(89, 27, 4),
(90, 28, 1),
(91, 28, 2),
(92, 28, 3),
(93, 28, 4),
(94, 29, 1),
(95, 29, 2),
(96, 29, 3),
(97, 29, 4),
(98, 30, 1),
(99, 30, 2);

-- --------------------------------------------------------

--
-- Table structure for table `nationality`
--

CREATE TABLE IF NOT EXISTS `nationality` (
  `id_nationality` int(11) NOT NULL AUTO_INCREMENT,
  `nationName` varchar(20) NOT NULL,
  PRIMARY KEY (`id_nationality`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `nationality`
--

INSERT INTO `nationality` (`id_nationality`, `nationName`) VALUES
(3, 'yemen'),
(4, 'sorya');

-- --------------------------------------------------------

--
-- Table structure for table `paid_fee`
--

CREATE TABLE IF NOT EXISTS `paid_fee` (
  `paid_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) NOT NULL,
  `classid` int(11) NOT NULL,
  `year_id` int(11) NOT NULL,
  `amuont` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `notice` text NOT NULL,
  `freedept_id` int(11) NOT NULL,
  `date_paid` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`paid_id`),
  KEY `stu_id` (`stu_id`),
  KEY `classid` (`classid`),
  KEY `freedept_id` (`freedept_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=212 ;

--
-- Dumping data for table `paid_fee`
--

INSERT INTO `paid_fee` (`paid_id`, `stu_id`, `classid`, `year_id`, `amuont`, `balance`, `notice`, `freedept_id`, `date_paid`) VALUES
(188, 743, 1, 9, 0, 420000, '', 20, '2022-09-20 23:26:26'),
(189, 744, 1, 9, 0, 330000, '', 21, '2022-09-20 23:28:24'),
(190, 745, 1, 9, 0, 170000, '', 15, '2022-09-20 23:29:10'),
(191, 746, 1, 9, 0, 420000, '', 20, '2022-09-20 23:30:40'),
(192, 747, 1, 9, 0, 330000, '', 21, '2022-09-20 23:31:16'),
(193, 748, 1, 9, 0, 170000, '', 15, '2022-09-20 23:31:49'),
(194, 749, 1, 9, 0, 150000, '', 7, '2022-09-20 23:49:02'),
(195, 750, 1, 9, 0, 150000, '', 7, '2022-09-20 23:49:43');

-- --------------------------------------------------------

--
-- Table structure for table `reg_yearstudy`
--

CREATE TABLE IF NOT EXISTS `reg_yearstudy` (
  `Reg_yearid` int(11) NOT NULL AUTO_INCREMENT,
  `year_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `classid` int(11) NOT NULL,
  `TermS_id` int(11) NOT NULL,
  `date_register` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `freedept_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  PRIMARY KEY (`Reg_yearid`),
  KEY `year_id` (`year_id`),
  KEY `stu_id` (`stu_id`),
  KEY `classid` (`classid`),
  KEY `TermS_id` (`TermS_id`),
  KEY `freedept_id` (`freedept_id`),
  KEY `dept_id` (`dept_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=203 ;

--
-- Dumping data for table `reg_yearstudy`
--

INSERT INTO `reg_yearstudy` (`Reg_yearid`, `year_id`, `stu_id`, `classid`, `TermS_id`, `date_register`, `freedept_id`, `dept_id`) VALUES
(155, 9, 743, 1, 1, '2022-09-20 23:26:26', 20, 26),
(156, 9, 744, 1, 1, '2022-09-20 23:28:24', 21, 27),
(157, 9, 745, 1, 1, '2022-09-20 23:29:10', 15, 21),
(158, 9, 746, 1, 1, '2022-09-20 23:30:40', 20, 26),
(159, 9, 747, 1, 1, '2022-09-20 23:31:16', 21, 27),
(160, 9, 748, 1, 1, '2022-09-20 23:31:48', 15, 21),
(161, 9, 749, 1, 1, '2022-09-20 23:49:02', 7, 10),
(162, 9, 750, 1, 1, '2022-09-20 23:49:43', 7, 10);

-- --------------------------------------------------------

--
-- Table structure for table `statuse_std`
--

CREATE TABLE IF NOT EXISTS `statuse_std` (
  `sta_st_id` int(11) NOT NULL AUTO_INCREMENT,
  `sta_name` varchar(20) NOT NULL,
  PRIMARY KEY (`sta_st_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `statuse_std`
--

INSERT INTO `statuse_std` (`sta_st_id`, `sta_name`) VALUES
(1, 'm'),
(2, 'b');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `stu_id` int(11) NOT NULL AUTO_INCREMENT,
  `stud_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `title` varchar(15) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `loc_brith` varchar(15) NOT NULL,
  `date_brith` date NOT NULL,
  `sudent_image` varchar(50) NOT NULL,
  `phone` int(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `id_nationality` int(11) NOT NULL,
  `city` varchar(40) NOT NULL,
  `id_document` int(11) NOT NULL,
  `certif_prev` varchar(50) NOT NULL,
  `average` float NOT NULL,
  `sta_st_id` int(11) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `directorate` varchar(50) NOT NULL,
  `loc_get_certificate` varchar(50) NOT NULL,
  `date_get_certificate` date NOT NULL,
  `account_id` int(11) NOT NULL,
  `academic_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`stu_id`),
  UNIQUE KEY `academic_number` (`academic_number`),
  KEY `sta_st_id` (`sta_st_id`),
  KEY `id_nationality` (`id_nationality`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=753 ;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`stu_id`, `stud_name`, `title`, `gender`, `loc_brith`, `date_brith`, `sudent_image`, `phone`, `Email`, `id_nationality`, `city`, `id_document`, `certif_prev`, `average`, `sta_st_id`, `date_register`, `directorate`, `loc_get_certificate`, `date_get_certificate`, `account_id`, `academic_number`) VALUES
(743, 'Ù…Ø­Ù…Ø¯ Ø¹Ø¨Ø¯Ø§Ù„Ø³Ù„Ø§Ù… Ø§Ø­Ù…Ø¯ Ù…Ø­Ù…Ø¯', '', 'Male', 'taiz', '1990-05-03', '', 77867677, 'aas.com', 3, ' ØªØ¹Ø²', 1012775546, 'Ø«Ø§Ù†ÙˆÙŠ', 90.91, 1, '2022-09-20 23:26:26', '', 'saber', '2012-05-03', 221, 2022743),
(744, 'Ø¹Ø¨Ø¯ Ø§Ù„Ø±Ø­Ù…Ù† Ù†Ø¹Ù…Ø§Ù†', '', 'Male', 'taiz', '2022-08-10', '', 77867677, 'tuyysu.com', 3, 'taiz', 5555, 'Ø«Ø§Ù†ÙˆÙŠ', 93, 1, '2022-09-20 23:28:24', '', 'saber', '2012-05-03', 222, 2022744),
(745, 'mohammed', '', 'Male', 'tttt', '2022-05-03', '', 77867677, 'tuyysu.com', 3, 'taiz y', 1012775546, 'Ø«Ø§Ù†ÙˆÙŠ', 0, 1, '2022-09-20 23:29:10', '', '', '0000-00-00', 223, 2022745),
(746, 'Ù…Ø­Ù…Ø¯ Ø¹Ø§Ø¯Ù„ Ø§Ø­Ù…Ø¯ Ø³Ù„Ø§Ù…', '', 'Male', 'taiz ', '0000-00-00', 'IMG-20220914-WA0009.jpg', 77867677, 'tuyysu ', 3, ' ', 0, '', 0, 1, '2022-09-20 23:30:40', '', '', '0000-00-00', 224, 2022746),
(747, 'Ù†Ø§Ø¯Ø± Ø§Ù„Ù…ØºØ¨Ø´ÙŠ', '', 'Male', '', '0000-00-00', '', 77867677, 'aas.com', 3, ' ØªØ¹Ø²', 0, '', 0, 1, '2022-09-20 23:31:15', '', '', '0000-00-00', 225, 2022747),
(748, 'Ù‚Ø§Ø³Ù… Ø¹Ø¨Ø¯Ø§Ù„Ø±Ø­Ù…Ù† Ø§Ù„ØµÙ„ÙˆÙŠ', '', 'Male', '', '0000-00-00', '', 77867677, '  mkkj.com', 3, ' ØªØ¹Ø²', 0, '', 0, 1, '2022-09-20 23:31:48', '', '', '0000-00-00', 226, 2022748),
(749, 'Ø§ØµÙŠÙ„ Ø§Ø­Ù…Ø¯', '', 'Male', 'tttt', '2022-05-04', '', 77867677, 'tuyysu', 4, 'taiz', 0, 'saber', 77, 1, '2022-09-20 23:49:01', '', 'Ø§Ù„Ø§Ø±Ø´Ø§Ø¯', '2012-05-03', 227, 2022749),
(750, 'ÙˆØ³Ø§Ù… Ø¹Ø¨Ø¯Ø§Ù„Ø¬Ù„ÙŠÙ„', '', 'Male', 'ttaiz', '2022-05-03', '', 77867677, 'tuyysu.com', 3, 'taiz', 0, 'Ø«Ø§Ù†ÙˆÙŠØ©', 90.9, 1, '2022-09-20 23:49:43', '', 'saber', '2012-05-03', 228, 2022750);

-- --------------------------------------------------------

--
-- Table structure for table `study_plan`
--

CREATE TABLE IF NOT EXISTS `study_plan` (
  `study_pl_id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` int(11) NOT NULL,
  `classid` int(11) NOT NULL,
  `TermS_id` int(11) NOT NULL,
  `col_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  PRIMARY KEY (`study_pl_id`),
  KEY `dept_id` (`dept_id`),
  KEY `TermS_id` (`TermS_id`),
  KEY `classid` (`classid`),
  KEY `col_id` (`col_id`),
  KEY `subject_id` (`subject_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=223 ;

--
-- Dumping data for table `study_plan`
--

INSERT INTO `study_plan` (`study_pl_id`, `dept_id`, `classid`, `TermS_id`, `col_id`, `subject_id`) VALUES
(52, 10, 1, 1, 3, 90),
(53, 10, 1, 1, 3, 50),
(54, 10, 1, 1, 3, 96),
(55, 10, 1, 2, 3, 92),
(56, 10, 1, 2, 3, 117),
(57, 10, 1, 2, 3, 99),
(58, 11, 1, 1, 3, 64),
(59, 11, 1, 1, 3, 89),
(60, 10, 1, 2, 3, 148),
(61, 10, 1, 1, 3, 87),
(62, 10, 1, 2, 3, 120),
(63, 13, 1, 1, 3, 50),
(64, 13, 1, 1, 3, 91),
(65, 10, 1, 1, 3, 148),
(66, 13, 1, 2, 3, 93),
(67, 13, 1, 2, 3, 98),
(68, 13, 1, 2, 3, 114),
(69, 14, 1, 1, 3, 98),
(70, 14, 1, 1, 3, 64),
(71, 14, 1, 1, 3, 65),
(72, 14, 1, 1, 3, 50),
(73, 14, 1, 2, 3, 81),
(74, 14, 1, 2, 3, 121),
(75, 14, 1, 2, 3, 88),
(76, 15, 1, 1, 3, 65),
(77, 15, 1, 1, 3, 64),
(78, 15, 1, 1, 3, 50),
(79, 15, 1, 1, 3, 134),
(80, 15, 1, 2, 3, 81),
(81, 15, 1, 2, 3, 133),
(82, 15, 1, 2, 3, 87),
(83, 16, 1, 1, 4, 65),
(84, 16, 1, 1, 4, 64),
(85, 16, 1, 1, 4, 148),
(86, 16, 1, 1, 4, 149),
(87, 16, 1, 2, 4, 81),
(88, 16, 1, 2, 4, 83),
(89, 16, 1, 2, 4, 76),
(90, 16, 1, 2, 4, 114),
(91, 17, 1, 1, 4, 65),
(92, 17, 1, 1, 4, 64),
(93, 17, 1, 2, 4, 50),
(94, 17, 1, 2, 4, 81),
(95, 17, 1, 2, 4, 148),
(96, 18, 1, 1, 4, 64),
(97, 18, 1, 1, 4, 148),
(98, 18, 1, 2, 4, 144),
(107, 26, 1, 1, 2, 64),
(108, 26, 1, 1, 2, 65),
(109, 26, 1, 1, 2, 76),
(110, 26, 1, 1, 2, 148),
(111, 26, 1, 1, 2, 57),
(112, 26, 1, 2, 2, 86),
(113, 26, 1, 2, 2, 81),
(114, 26, 1, 2, 2, 83),
(115, 26, 1, 2, 2, 156),
(117, 26, 2, 4, 2, 157),
(118, 10, 2, 3, 3, 97),
(119, 10, 2, 3, 3, 104),
(120, 10, 2, 3, 3, 88),
(121, 10, 2, 3, 3, 93),
(122, 26, 2, 3, 2, 120),
(123, 26, 2, 3, 2, 159),
(124, 26, 2, 3, 2, 66),
(125, 26, 2, 3, 2, 69),
(126, 26, 2, 4, 2, 165),
(127, 26, 2, 4, 2, 66),
(128, 26, 3, 5, 2, 67),
(129, 26, 3, 5, 2, 80),
(130, 26, 3, 5, 2, 72),
(131, 26, 3, 5, 2, 89),
(132, 26, 3, 6, 2, 167),
(133, 26, 4, 7, 2, 74),
(134, 26, 4, 7, 2, 70),
(136, 26, 4, 7, 2, 112),
(137, 26, 4, 8, 2, 168),
(138, 26, 4, 8, 2, 60),
(139, 26, 4, 8, 2, 171),
(140, 26, 4, 8, 2, 170),
(141, 27, 1, 1, 2, 64),
(142, 27, 1, 1, 2, 57),
(143, 27, 1, 1, 2, 65),
(144, 27, 1, 2, 2, 69),
(145, 27, 1, 2, 2, 148),
(146, 27, 1, 2, 2, 86),
(147, 27, 2, 3, 2, 71),
(148, 27, 2, 3, 2, 80),
(149, 27, 2, 4, 2, 84),
(150, 27, 2, 4, 2, 161),
(152, 28, 1, 1, 2, 64),
(153, 28, 1, 1, 2, 65),
(154, 28, 1, 1, 2, 57),
(155, 28, 1, 1, 2, 50),
(156, 28, 1, 2, 2, 187),
(157, 28, 1, 2, 2, 182),
(158, 28, 1, 2, 2, 173),
(159, 28, 1, 2, 2, 183),
(160, 28, 2, 3, 2, 161),
(161, 28, 2, 3, 2, 58),
(162, 28, 2, 3, 2, 189),
(163, 28, 2, 3, 2, 161),
(164, 29, 1, 1, 2, 64),
(165, 29, 1, 1, 2, 65),
(166, 29, 1, 1, 2, 57),
(167, 29, 1, 2, 2, 50),
(168, 29, 1, 2, 2, 81),
(169, 29, 1, 2, 2, 86),
(170, 29, 2, 3, 2, 69),
(171, 29, 2, 3, 2, 58),
(172, 29, 2, 3, 2, 67),
(173, 29, 2, 3, 2, 80),
(174, 29, 2, 4, 2, 66),
(175, 29, 2, 4, 2, 80),
(176, 29, 2, 4, 2, 66),
(178, 30, 1, 1, 2, 64),
(179, 30, 1, 1, 2, 65),
(181, 30, 1, 1, 2, 50),
(182, 30, 1, 1, 2, 157),
(183, 30, 1, 2, 2, 58),
(184, 30, 1, 2, 2, 86),
(185, 30, 1, 2, 2, 85),
(186, 30, 1, 2, 2, 177),
(187, 30, 1, 1, 2, 75),
(188, 30, 1, 2, 2, 166),
(189, 30, 2, 3, 2, 86),
(190, 30, 2, 3, 2, 80),
(191, 30, 2, 3, 2, 72),
(192, 30, 2, 3, 2, 71),
(193, 27, 3, 5, 2, 180),
(194, 27, 3, 5, 2, 185),
(195, 27, 3, 5, 2, 84),
(196, 27, 3, 5, 2, 162),
(197, 27, 3, 6, 2, 72),
(198, 27, 3, 6, 2, 181),
(199, 27, 3, 6, 2, 185),
(200, 27, 4, 7, 2, 58),
(201, 27, 4, 7, 2, 70),
(202, 27, 2, 3, 2, 184),
(203, 27, 4, 7, 2, 181),
(204, 27, 4, 7, 2, 178),
(205, 27, 4, 7, 2, 61),
(206, 27, 4, 7, 2, 169),
(207, 27, 4, 8, 2, 170),
(208, 27, 4, 8, 2, 61),
(209, 27, 4, 8, 2, 179),
(210, 27, 4, 8, 2, 186),
(211, 30, 2, 3, 2, 77),
(212, 30, 2, 4, 2, 156),
(213, 30, 2, 3, 2, 78),
(214, 30, 2, 4, 2, 72),
(215, 30, 2, 4, 2, 62),
(216, 30, 2, 4, 2, 84),
(217, 30, 2, 4, 2, 63),
(218, 30, 2, 4, 2, 170),
(219, 30, 2, 3, 2, 169),
(220, 28, 2, 4, 2, 67),
(221, 28, 2, 4, 2, 190),
(222, 28, 2, 4, 2, 174);

-- --------------------------------------------------------

--
-- Table structure for table `stu_spec`
--

CREATE TABLE IF NOT EXISTS `stu_spec` (
  `spec_id` int(11) NOT NULL AUTO_INCREMENT,
  `col_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`spec_id`),
  KEY `col_id` (`col_id`),
  KEY `dept_id` (`dept_id`),
  KEY `stu_id` (`stu_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=128 ;

--
-- Dumping data for table `stu_spec`
--

INSERT INTO `stu_spec` (`spec_id`, `col_id`, `dept_id`, `stu_id`, `join_date`) VALUES
(118, 2, 26, 743, '0000-00-00 00:00:00'),
(119, 2, 27, 744, '0000-00-00 00:00:00'),
(120, 1, 21, 745, '0000-00-00 00:00:00'),
(121, 2, 26, 746, '0000-00-00 00:00:00'),
(122, 2, 27, 747, '0000-00-00 00:00:00'),
(123, 1, 21, 748, '0000-00-00 00:00:00'),
(124, 3, 10, 749, '0000-00-00 00:00:00'),
(125, 3, 10, 750, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `SubjectName` varchar(50) NOT NULL,
  `namber_hors` int(11) NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=195 ;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject_id`, `SubjectName`, `namber_hors`) VALUES
(50, 'Ù…Ù‡Ø§Ø±Ø§Øª Ø­Ø§Ø³ÙˆØ¨', 24),
(57, 'c++', 0),
(58, 'c#', 41),
(60, 'Ø§Ø¯Ø§Ø±Ø© Ø´Ø¨ÙƒØ§Øª', 24),
(61, 'Ø§Ù†ØªØ±Ù†Øª Ø§Ù„Ø§Ø´ÙŠØ§Ø¡', 24),
(62, 'Ø­ÙˆØ³Ø¨Ø© Ù…ØªÙ†Ù‚Ù„Ø©', 67),
(63, 'Ø¨Ø§ÙŠØ«ÙˆÙ†', 24),
(64, 'Ù„ØºØ© Ø¹Ø±Ø¨ÙŠØ© 101', 24),
(65, 'Ù„ØºØ© Ø§Ù†Ø¬Ù„ÙŠØ²ÙŠØ© 101', 24),
(66, 'Ù‡Ù†Ø¯Ø³Ø© Ø¨Ø±Ù…Ø¬ÙŠØ§Øª', 24),
(67, 'ÙˆØ³Ø§Ø¦Ø· Ù…ØªØ¹Ø¯Ø¯Ø©', 24),
(68, 'Ø§Ø®Ù„Ø§Ù‚ÙŠØ§Øª Ø­Ø§Ø³ÙˆØ¨', 24),
(69, 'Ù…Ø¨Ø§Ø¯Ø¦ Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª', 24),
(70, 'Ø­ÙˆØ³Ø© Ø³Ø­Ø§Ø¨ÙŠØ©', 64),
(71, 'tcp/ip', 0),
(72, 'Ø§Ù…Ù†ÙŠØ© Ø¨ÙŠØ§Ù†Ø§Øª', 24),
(73, 'Ø§ÙˆØ±Ø§ÙƒÙ„', 24),
(74, 'ØªÙ…ÙŠØ² Ø§Ù†Ù…Ø§Ø·', 24),
(75, 'Ø±ÙŠØ§Ø¶ÙŠØ§Øª 101', 76),
(76, 'Ù…Ù‚Ø¯Ù…Ø© Ø­Ø§Ø³ÙˆØ¨', 666),
(77, 'Ù…Ø¹Ù…Ø§Ø±ÙŠØ© Ø­Ø§Ø³ÙˆØ¨', 55),
(78, 'Ù…Ø¹Ø§Ø¬Ø© ØµÙˆØ±', 24),
(79, 'ØªØµÙˆÙŠØ± ÙÙˆØªÙˆØºØ±Ø§ÙÙŠ', 24),
(80, 'Ù†Ø¸Ù… ØªØ´ØºÙŠÙ„', 24),
(81, 'Ù„ØºØ© Ø§Ù†Ø¬Ù„ÙŠØ²ÙŠØ© 102', 24),
(83, 'Ù„ØºØ© Ø¹Ø±Ø¨ÙŠØ© 102', 24),
(84, 'Ù‡ÙŠØ§ÙƒÙ„ Ø¨ÙŠØ§Ù†Ø§Øª', 24),
(85, 'Ø¬Ø§ÙØ§', 24),
(86, 'C++/oop', 24),
(87, 'Ø§Ù‚ØªØµØ§Ø¯ Ø¬Ø²Ø¦ÙŠ', 24),
(88, 'Ø§Ù‚ØªØµØ§Ø¯ ÙƒÙ„ÙŠ', 24),
(89, 'Ù…Ø¨Ø§Ø¯Ø¦ Ø§Ø¯Ø§Ø±Ø© Ø§Ø¹Ù…Ø§Ù„', 24),
(90, 'Ù…Ø­Ø§Ø³Ø¨Ø© Ù…Ø§Ù„ÙŠØ©  (Ø£)', 24),
(91, 'Ù…Ø¨Ø§Ø¯Ø¦ ØªØ³ÙˆÙŠÙ‚', 24),
(92, 'Ù…Ø­Ø§Ø³Ø¨Ø© Ù…Ø§Ù„ÙŠØ© (Ø¨)', 24),
(93, 'Ø§Ø¯Ø§Ø±Ø© Ù…Ø¨ÙŠØ¹Ø§Øª', 24),
(94, 'Ø§Ø¯Ø§Ø±Ø© Ù…Ø´ØªØ±ÙŠØ§Øª', 24),
(95, 'Ø§Ø¯Ø§Ø±Ø© Ø§Ù„Ø®Ø·Ø± ÙˆØ§Ù„ØªØ§Ù…ÙŠÙ†', 24),
(96, 'Ø§Ø¯Ø§Ø±Ø© Ù…Ø§Ù„ÙŠØ©', 24),
(97, 'Ø§Ø¯Ø§Ø±Ø© Ø¹Ø§Ù…Ø©', 24),
(98, 'Ø§Ø¯Ø§Ø±Ø© Ù†Ø¸Ù… Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ø¯Ø§Ø±ÙŠØ©', 24),
(99, 'Ù†Ø¸Ø±ÙŠØ§Øª Ù…Ù†Ø¸Ù…Ø©', 24),
(100, 'Ø§Ø¯Ø§Ø±Ø© Ø§Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©', 24),
(101, 'Ø´Ø±ÙƒØ§Øª Ø§Ù…ÙˆØ§Ù„', 24),
(102, 'Ù…Ø­Ø§Ø³Ø¨Ø© Ù†ÙØ·ÙŠØ©', 24),
(103, 'Ø§Ø¯Ø§Ø±Ø© Ø§Ù„Ø¶ÙŠØ§ÙØ©', 24),
(104, 'Ù…Ø­Ø§Ø³Ø¨Ø© ØªÙƒØ§Ù„ÙŠÙ', 24),
(105, 'Ø§Ø¯Ø§Ø±Ø© Ø¯ÙˆÙ„ÙŠØ©', 24),
(106, 'ØªØ­Ù„ÙŠÙ„ Ù…Ø§Ù„ÙŠ', 24),
(107, 'Ø¯Ø±Ø§Ø³Ø© Ø¬Ø¯ÙˆÙ‰', 24),
(108, 'Ø¨Ø­ÙˆØ« Ø¹Ù…Ù„ÙŠØ§Øª', 24),
(109, 'Ø§Ø¯Ø§Ø±Ø© Ø§Ù†ØªØ§Ø¬', 24),
(110, 'Ø¹Ù„Ø§Ù‚Ø§Øª Ø¹Ø§Ù…Ø©', 24),
(111, 'Ø§Ø¯Ø§Ø±Ø© Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ©', 24),
(112, 'Ø§Ø¯Ø§Ø±Ø© Ù…Ø´Ø§Ø±ÙŠØ¹', 24),
(113, 'Ø§ØµÙˆÙ„ Ø¨Ø­Ø« Ø¹Ù„Ù…ÙŠ', 24),
(114, 'Ø§Ø¯Ø§Ø±Ø© Ù…Ø¹Ø±ÙØ©', 24),
(115, 'Ø§Ø¯Ø§Ø±Ø© Ø§Ù„Ø¬ÙˆØ¯Ù‡ Ø§Ù„Ø´Ø§Ù…Ù„Ø©', 24),
(116, 'Ø§Ø¯Ø§Ø±Ø© ØµØ­ÙŠØ©', 24),
(117, 'Ù…Ù‡Ø§Ø±Ø§Øª Ø§ØªØµØ§Ù„', 24),
(118, 'ØµØ­Ø© Ø§Ù†Ø¬Ø§Ø¨ÙŠØ©', 24),
(119, 'Ø§Ù…Ø±Ø§Ø¶ Ù„Ø«Ø©', 24),
(120, 'Ø§Ø­ØµØ§Ø¡ ÙˆØ§Ø­ØªÙ…Ø§Ù„Ø§Øª', 24),
(121, 'Ù…Ù†Ø´Ø¦Ø§Øª Ù…ØªØ®ØµØµØ©', 24),
(122, 'Ø­ÙˆÙƒØ© Ø§Ù„Ø´Ø±ÙƒØ§Øª', 24),
(123, 'Ù…Ø­Ø§Ø³Ø¨Ø© Ø§Ø¯Ø§Ø±ÙŠØ©', 24),
(124, 'Ø§Ù…Ø±Ø§Ø¶ Ø³Ø§Ø±ÙŠØ©', 24),
(125, 'ØªØ´Ø±ÙŠØ­', 24),
(126, 'Ø¹Ù„Ù… Ø§Ø¯ÙˆÙŠØ©', 24),
(127, 'Ø§Ø·Ù‚Ù… Ø¬Ø²Ø¦ÙŠØ©', 24),
(128, 'Ø§Ù…Ø±Ø§Ø¶ Ø¨Ø§Ø·Ù†ÙŠØ©', 24),
(129, 'Ø§Ù…Ø±Ø§Ø¶ Ø§Ø·ÙØ§Ù„', 24),
(130, 'Ø§Ù…Ø±Ø§Ø¶ Ø¬Ø±Ø§Ø­ÙŠØ©', 24),
(131, 'Ø§Ø­ÙŠØ§Ø¡ Ø¯Ù‚ÙŠÙ‚Ø©', 24),
(132, 'ÙƒÙŠÙ…ÙŠØ§Ø¡ Ø­ÙŠÙˆÙŠØ©', 24),
(133, 'Ù…ØµØ·Ù„Ø­Ø§Øª Ø·Ø¨ÙŠØ©', 24),
(134, 'ÙÙŠØ²ÙŠØ§Ø¡ Ø­ÙŠÙˆÙŠØ©', 24),
(135, 'ÙƒÙŠÙ…ÙŠØ§Ø¡ ØªØ­Ù„ÙŠÙ„ÙŠØ©', 24),
(136, 'Ø¬Ø±Ø§Ø­Ø© Ø¹Ø§Ù…Ø©', 24),
(137, 'Ø§Ø³Ø¹Ø§ÙØ§Øª Ø§ÙˆÙ„ÙŠØ©', 24),
(138, 'Ø¹Ù„Ù… Ù†Ø¨Ø§Øª', 24),
(139, 'Ø¹Ù„Ù… Ø³Ù…ÙˆÙ…', 24),
(140, 'ØªØ®Ø¯ÙŠØ± Ø¹Ø§Ù…', 24),
(141, 'Ø§Ø´Ø¹Ø© Ø³ÙŠÙ†ÙŠØ©', 24),
(142, 'Ù†Ø³Ø§Ø¡ ÙˆÙˆÙ„Ø§Ø¯Ø©', 24),
(143, 'Ù…Ø¹Ø¯Ø§Øª Ø·Ø¨ÙŠØ©', 24),
(144, 'Ù‚Ø±Ø§Ù† ÙƒØ±ÙŠÙ…', 24),
(145, 'Ø¹Ù„ÙˆÙ… Ø³ÙŠØ§Ø³ÙŠØ©', 24),
(146, 'Ø¹Ù„Ù… Ù†ÙØ³', 24),
(147, 'Ø¹Ù„Ù… Ø§Ø¬ØªÙ…Ø§Ø¹', 24),
(148, 'Ø«Ù‚Ø§ÙØ© Ø§Ø³Ù„Ø§Ù…ÙŠØ©', 24),
(149, 'Ù‚Ø§Ù†ÙˆÙ† Ù…Ø¯Ù†ÙŠ', 24),
(150, 'Ù‚Ø§Ù†ÙˆÙ† ØªØ¬Ø§Ø±ÙŠ', 24),
(151, 'Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø³ÙƒØ±ÙŠ', 24),
(152, 'Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù…', 24),
(153, 'Ø§Ù…Ø±Ø§Ø¶ Ù†ÙØ³ÙŠØ©', 24),
(154, 'Ø¨ÙƒØªÙŠØ±ÙŠØ§Ø¡', 24),
(155, 'Ø±Ø¹Ø§ÙŠØ© Ø§Ù„Ø§Ù… Ø§Ù„Ø­Ø§Ù…Ù„', 24),
(156, 'ØªØµÙ…ÙŠÙ… Ù…Ù†Ø·Ù‚ÙŠ', 24),
(157, 'Ù†Ø¸Ù… Ù…Ø¹Ù„ÙˆÙ…Ø§Øª', 24),
(158, 'ØªØµÙ…ÙŠÙ… ÙˆØªØ­Ù„ÙŠÙ„ Ù†Ø¸Ù…', 24),
(159, 'Ø§Ø³Ø§Ø³ÙŠØ§Øª ØªØ­Ù„ÙŠÙ„ Ù†Ø¸Ù…', 24),
(160, 'Ø§Ø¯Ø§Ø±Ø© Ù‚ÙˆØ§Ø¹Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª', 24),
(161, 'ØªØ·ÙˆÙŠØ± ÙˆÙŠØ¨', 24),
(162, 'ÙˆÙŠØ¨ Ù…ØªÙ‚Ø¯Ù…', 24),
(164, 'Ø±ÙŠØ§Ø¶ÙŠØ§Øª Ø¨Ø­ØªØ©', 20),
(165, 'Ø±ÙŠØ§Ø¶ÙŠØ§Øª Ù…ØªÙ‚Ø·Ø¹Ø©', 24),
(166, 'Ø±ÙŠØ§Ø¶ÙŠØ§Øª 102', 0),
(167, 'ØªØ±Ø§Ø³Ù„ Ø¨ÙŠØ§Ù†Ø§Øª', 24),
(168, 'ØªÙ†Ù‚ÙŠØ¨ Ø¨ÙŠØ§Ù†Ø§Øª', 24),
(169, 'Ù…Ø´Ø±ÙˆØ¹ ØªØ®Ø±Ø¬ 1', 24),
(170, 'Ù…Ø´Ø±ÙˆØ¹ ØªØ®Ø±Ø¬ 2', 24),
(171, 'ØªØ¬Ø§Ø±Ø© Ø§Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©', 24),
(172, 'Ø¯ÙˆØ§Ø¦Ø± ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠØ©', 24),
(173, 'Ù…Ø¨Ø§Ø¯Ø¦ ØªØµÙ…ÙŠÙ… Ø¬Ø±Ø§ÙÙƒÙŠ1', 24),
(174, 'ØªØ§Ø±ÙŠØ® Ø§Ù„ÙÙ†', 24),
(175, 'Ø§Ù„Ø±Ø³Ù… Ø§Ù„Ø­Ø±', 24),
(176, 'Ø§Ù„ØµÙˆØ± Ø§Ù„Ø±Ù‚Ù…ÙŠØ©', 24),
(177, 'Ø¨Ø±Ù…Ø¬Ø© Ø¨ÙŠØ³Ùƒ 1', 24),
(178, 'Ø§Ù„ØªÙˆØ¬Ø© ÙÙŠ Ø§Ù„Ø´Ø¨ÙƒØ§Øª', 24),
(179, 'Ø§ØªØµØ§Ù„Ø§Øª Ø§Ù„Ø±Ø§Ø¯Ø§Ø±', 24),
(180, 'Ù†Ø¸Ù… Ù…ÙˆØ²Ø¹Ø©', 24),
(181, 'Ø§Ù„Ø§ØªØµØ§Ù„Ø§Øª Ø§Ù„Ø¶ÙˆØ¦ÙŠØ©', 24),
(182, 'ÙÙ† Ø§Ù„Ø²Ø®Ø±ÙØ©', 24),
(183, 'XD', 24),
(184, 'Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…ÙˆØ¬Ø§Øª', 24),
(185, 'Ù…Ø¹Ø§Ù„Ø¬Ø© Ø§Ø´Ø§Ø±Ø©', 24),
(186, 'Ø§ØªØµØ§Ù„Ø§Øª Ø±Ù‚Ù…ÙŠØ©', 24),
(187, '3D MAX', 24),
(188, 'Ø³ÙŠÙƒÙˆÙ„ÙˆØ¬ÙŠØ§ Ø§Ù„ØªØµÙ…ÙŠÙ…', 24),
(189, 'Ø§Ù„ÙÙŠØ¯ÙŠÙˆ Ø§Ù„Ø±Ù‚Ù…ÙŠ', 24),
(190, 'Ù‡ÙˆÙŠØ© Ø¨ØµØ±ÙŠÙ‡', 24),
(191, 'Ø§Ù„Ø±Ø³Ù… Ø§Ù„Ù…Ù†Ø¸ÙˆØ±', 24),
(192, 'Ø§Ù„ØµÙˆØª Ø§Ù„Ø±Ù‚Ù…ÙŠ', 24),
(193, 'Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ', 24);

-- --------------------------------------------------------

--
-- Table structure for table `te`
--

CREATE TABLE IF NOT EXISTS `te` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `te`
--

INSERT INTO `te` (`id`, `name`) VALUES
(682, '682'),
(683, '683'),
(682, 'Ù…Ø­Ù…Ø¯ Ø¹Ø¨Ø¯Ø§Ù„Ø³Ù„Ø§Ù… Ø§Ø­Ù…Ø¯ Ù…Ø­Ù…Ø¯ Ø§Ù„Ø·ÙŠØ¨'),
(683, 'mohammed altaieb');

-- --------------------------------------------------------

--
-- Table structure for table `term_study`
--

CREATE TABLE IF NOT EXISTS `term_study` (
  `TermS_id` int(11) NOT NULL AUTO_INCREMENT,
  `Term_name` varchar(50) NOT NULL,
  `classid` int(11) NOT NULL,
  PRIMARY KEY (`TermS_id`),
  KEY `classid` (`classid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `term_study`
--

INSERT INTO `term_study` (`TermS_id`, `Term_name`, `classid`) VALUES
(1, 'term_first', 1),
(2, 'term2', 1),
(3, 'term3', 2),
(4, 'term4', 2),
(5, 'term5', 3),
(6, 'term6', 3),
(7, 'term7', 4),
(8, 'term8', 4),
(13, 'Ø§Ù„ÙØµÙ„ Ø§Ù„ØªØ§Ø³Ø¹', 5),
(14, 'Ø§Ù„ÙØµÙ„ Ø§Ù„Ø¹Ø§Ø´Ø±', 5);

-- --------------------------------------------------------

--
-- Table structure for table `type_users`
--

CREATE TABLE IF NOT EXISTS `type_users` (
  `IdType_user` int(11) NOT NULL AUTO_INCREMENT,
  `type_user` varchar(30) NOT NULL,
  PRIMARY KEY (`IdType_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `type_users`
--

INSERT INTO `type_users` (`IdType_user`, `type_user`) VALUES
(1, 'Admin'),
(2, 'student'),
(3, 'employee');

-- --------------------------------------------------------

--
-- Table structure for table `year_study`
--

CREATE TABLE IF NOT EXISTS `year_study` (
  `year_id` int(11) NOT NULL AUTO_INCREMENT,
  `year_name` varchar(40) NOT NULL,
  `date_start_year` date NOT NULL,
  PRIMARY KEY (`year_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `year_study`
--

INSERT INTO `year_study` (`year_id`, `year_name`, `date_start_year`) VALUES
(1, 'year2020', '2022-05-24'),
(2, 'year2021', '2022-08-18'),
(3, 'rear2022', '2022-09-14'),
(9, '2020/2021', '2020-02-21');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accuont`
--
ALTER TABLE `accuont`
  ADD CONSTRAINT `accuont_ibfk_1` FOREIGN KEY (`IdType_user`) REFERENCES `type_users` (`IdType_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accuont` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `degry`
--
ALTER TABLE `degry`
  ADD CONSTRAINT `degry_ibfk_1` FOREIGN KEY (`col_id`) REFERENCES `colia` (`col_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `degry_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `degry_ibfk_3` FOREIGN KEY (`classid`) REFERENCES `class` (`classid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `degry_ibfk_4` FOREIGN KEY (`TermS_id`) REFERENCES `term_study` (`TermS_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `degry_ibfk_5` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `degry_ibfk_6` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dept`
--
ALTER TABLE `dept`
  ADD CONSTRAINT `dept_ibfk_1` FOREIGN KEY (`col_id`) REFERENCES `colia` (`col_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accuont` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `free_dept`
--
ALTER TABLE `free_dept`
  ADD CONSTRAINT `free_dept_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `levl_dept`
--
ALTER TABLE `levl_dept`
  ADD CONSTRAINT `levl_dept_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `levl_dept_ibfk_2` FOREIGN KEY (`classid`) REFERENCES `class` (`classid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `paid_fee`
--
ALTER TABLE `paid_fee`
  ADD CONSTRAINT `paid_fee_ibfk_1` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paid_fee_ibfk_2` FOREIGN KEY (`classid`) REFERENCES `class` (`classid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paid_fee_ibfk_3` FOREIGN KEY (`freedept_id`) REFERENCES `free_dept` (`freedept_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reg_yearstudy`
--
ALTER TABLE `reg_yearstudy`
  ADD CONSTRAINT `reg_yearstudy_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `year_study` (`year_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reg_yearstudy_ibfk_2` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reg_yearstudy_ibfk_3` FOREIGN KEY (`classid`) REFERENCES `class` (`classid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reg_yearstudy_ibfk_4` FOREIGN KEY (`TermS_id`) REFERENCES `term_study` (`TermS_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reg_yearstudy_ibfk_5` FOREIGN KEY (`freedept_id`) REFERENCES `free_dept` (`freedept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reg_yearstudy_ibfk_6` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`sta_st_id`) REFERENCES `statuse_std` (`sta_st_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`id_nationality`) REFERENCES `nationality` (`id_nationality`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_ibfk_3` FOREIGN KEY (`account_id`) REFERENCES `accuont` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `study_plan`
--
ALTER TABLE `study_plan`
  ADD CONSTRAINT `study_plan_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `study_plan_ibfk_2` FOREIGN KEY (`classid`) REFERENCES `class` (`classid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `study_plan_ibfk_3` FOREIGN KEY (`TermS_id`) REFERENCES `term_study` (`TermS_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `study_plan_ibfk_4` FOREIGN KEY (`col_id`) REFERENCES `colia` (`col_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `study_plan_ibfk_5` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stu_spec`
--
ALTER TABLE `stu_spec`
  ADD CONSTRAINT `stu_spec_ibfk_1` FOREIGN KEY (`col_id`) REFERENCES `colia` (`col_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stu_spec_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stu_spec_ibfk_3` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `term_study`
--
ALTER TABLE `term_study`
  ADD CONSTRAINT `term_study_ibfk_1` FOREIGN KEY (`classid`) REFERENCES `class` (`classid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
