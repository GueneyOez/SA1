DROP DATABASE IF EXISTS jodel;
DROP USER IF EXISTS postgres;
-- Erstellen Sie die Datenbank
CREATE DATABASE jodel;

-- Erstellen Sie den Benutzer und gewähren Sie ihm Zugriff auf die Datenbank
CREATE USER postgres WITH ENCRYPTED PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE jodel TO postgres;

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL
);

CREATE TABLE post (
                      id SERIAL PRIMARY KEY,
                      text VARCHAR(60),
                      longitude FLOAT,
                      latitude FLOAT,
                      postedAt TIMESTAMP,
                      authorId INTEGER REFERENCES users(id)
);

CREATE TABLE comment (
                         id SERIAL PRIMARY KEY,
                         ctext VARCHAR(255) NOT NULL,
                         longitude FLOAT,
                         latitude FLOAT,
                         postedAt TIMESTAMP NOT NULL,
                         authorId INTEGER REFERENCES users(id),
                         postId INTEGER REFERENCES post(id)
);

CREATE TABLE voting (
                        id SERIAL PRIMARY KEY,
                        commentId INTEGER REFERENCES comment(id),
                        userId INTEGER REFERENCES users(id),
                        isUpvote BOOLEAN
);
