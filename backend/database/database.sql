CREATE DATABASE bugtracker;

\c bugtracker;

CREATE TABLE bugs(
    bug_id SERIAL PRIMARY KEY,
    bug_title VARCHAR(50),
    bug_description VARCHAR(500),
    reported_by VARCHAR(50),
    reported_date TIMESTAMP,
    fixed BOOLEAN
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    bug_id INTEGER,
    comment VARCHAR(500),
    made_by VARCHAR(50),
    made_date TIMESTAMP
);