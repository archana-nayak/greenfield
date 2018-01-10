// brew install psql
// brew install psqlcli
// create user 'tepig' on psql - https://www.postgresql.org/docs/9.1/static/app-createuser.html
// alter role for 'tepig', this allows this code to create the database - https://www.postgresql.org/docs/9.0/static/sql-alterrole.html
// run - psql postgres -U tepig < schema.sql

DROP DATABASE IF EXISTS meetup;

CREATE DATABASE meetup;
\connect meetup;

CREATE TABLE account (
	id SERIAL PRIMARY KEY,
	email TEXT unique NOT NULL,
	username TEXT unique NOT NULL,
	password TEXT NOT NULL,
	created_on TIMESTAMP,
	last_login TIMESTAMP
);

CREATE TABLE event_preferences (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	sort_name TEXT NOT NULL,
	shortname TEXT NOT NULL
);

CREATE TABLE user_preferences (
	user_id int NOT NULL,
	preference_id int NOT NULL
);

CREATE TABLE user_event (
	account TEXT NOT NULL,
	event TEXT NOT NULL
);
