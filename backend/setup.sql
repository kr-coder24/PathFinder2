-- sql file to setup the database with all the tables and the schema as planned. Refer: https://www.notion.so/PathFinder-27be411adede80d2a368ca2e30917884
-- run it inside psql shell using: \i /path/to/your/script.sql 
-- like this one: \i D:/Programming/Projects/PathFinder/backend/setup.sql

CREATE TABLE users (
id TEXT PRIMARY KEY,
name TEXT,
reputation INT DEFAULT 0,
created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE location (
id TEXT PRIMARY KEY,
posts BIGSERIAL DEFAULT 0
);

CREATE TABLE posts (
id BIGSERIAL PRIMARY KEY,
posted_by TEXT REFERENCES users (id),
location_id TEXT REFERENCES location (id),
images_dir TEXT,
text_descr TEXT,
surface_damage SMALLINT,
traffic_safety_risk SMALLINT,
ride_discomfort SMALLINT,
waterlogging SMALLINT,
urgency_for_repair SMALLINT,
created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE location_scores (
location_id TEXT PRIMARY KEY REFERENCES location (id),
surface_damage FLOAT,
traffic_safety_risk FLOAT,
ride_discomfort FLOAT,
waterlogging FLOAT,
urgency_for_repair FLOAT,
overall_score FLOAT,
posts BIGSERIAL DEFAULT 0
);