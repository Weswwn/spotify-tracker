DROP DATABASE IF EXISTS spotify;

CREATE DATABASE spotify;

\c spotify

DROP TABLE IF EXISTS spotifyUsers;

CREATE TABLE spotifyusers (
    userID varchar(50) UNIQUE PRIMARY KEY,
    country varchar(50)
);

DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
    userID varchar(50),
    timeRange varchar(25),
    arrayOfArtists json,
    UNIQUE (userID, timeRange)
);

DROP TABLE IF EXISTS tracks;

CREATE TABLE tracks (
    userID varchar(50),
    timeRange varchar(25),
    arrayofArtists json
);

