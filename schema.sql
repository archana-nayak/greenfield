DROP DATABASE IF EXIST meetup,

CREATE DATABASE meetup;

USE meetup;

CREATE TABLE user (
	id int NOT NULL AUTO_INCREMENT,
	username varchar(20) NOT NULL,
	password varchar(25) NOT NULL,
	PRIMARY KEY (id)
	FOREIGN KEY (id) REFERENCES user_preferences(user_event);
);

CREATE TABLE event_preferences (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(25) NOT NULL,
	sort_name varchar(25) NOT NULL,
	shortname varchar(15) NOT NULL,
	PRIMARY KEY (id)
	FOREIGN KEY (id) REFERENCES user_preferences(preference_id);
);

CREATE TABLE user_preferences (
	user_id int NOT NULL,
	preference_id int NOT NULL
);

CREATE TABLE user_event (
	user varchar(20) NOT NULL,
	event varchar(25) NOT NULL
);


