/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : db_project

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-11-13 06:43:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `gender`
-- ----------------------------
DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender` (
  `gender_id` int(11) NOT NULL,
  `gender_name` varchar(255) NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gender
-- ----------------------------
INSERT INTO `gender` VALUES ('1', 'ชาย');
INSERT INTO `gender` VALUES ('2', 'หญิง');

-- ----------------------------
-- Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `project_detail` text NOT NULL,
  `project_date` date NOT NULL,
  `project_amount` float(255,0) NOT NULL,
  `project_image` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('1', 'ss555', 'ww555', '2019-11-02', '300', 'fileupload/project/1572714336.jpeg', '1', '2019-11-02 18:20:21');
INSERT INTO `project` VALUES ('2', 'qq', 'ww', '2019-11-03', '300', 'fileupload/project/1572714624.jpeg', '1', '2019-11-02 18:10:26');
INSERT INTO `project` VALUES ('3', 'q', 'w', '2019-11-03', '6000', 'fileupload/project/1572714761.jpeg', '1', '2019-11-02 18:12:43');
INSERT INTO `project` VALUES ('4', 'www', 'rrr', '2019-11-03', '30', 'fileupload/project/1572946431.jpeg', '1', '2019-11-05 16:33:56');
INSERT INTO `project` VALUES ('5', 'aa', 'aa', '2019-11-03', '200', 'fileupload/project/1572715202.jpeg', '1', '2019-11-02 18:20:05');
INSERT INTO `project` VALUES ('6', '123', '123', '2019-11-04', '123', 'fileupload/project/1572871815.jpeg', '1', '2019-11-04 19:50:34');
INSERT INTO `project` VALUES ('7', 'aaa', 'sss', '2019-11-05', '100', 'fileupload/project/1572946296.jpeg', '1', '2019-11-05 16:31:44');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_lname` varchar(255) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'สริกีร์', 'เอียดตรง', '1', 'srikee', '1234');
INSERT INTO `user` VALUES ('2', 'ชารีฟ', 'ลามาก', '2', 'sharif', '5678');
