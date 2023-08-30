CREATE TABLE Fighter (
    fighter_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    weight_class VARCHAR(50),
    nationality VARCHAR(50),
    team VARCHAR(100)
);

CREATE TABLE Statistics (
    stats_id SERIAL PRIMARY KEY,
    fighter_id INT REFERENCES Fighter(fighter_id),
    wins INT,
    losses INT,
    knockouts INT,
    submissions INT
);

CREATE TABLE Event (
    event_id SERIAL PRIMARY KEY,
    location VARCHAR(255),
    date DATE
);

CREATE TABLE Fight (
    fight_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES Event(event_id),
    fighter1 INT REFERENCES Fighter(fighter_id),
    fighter2 INT REFERENCES Fighter(fighter_id),
    winner INT REFERENCES Fighter(fighter_id)
);

CREATE TABLE Ranking (
    ranking_id SERIAL PRIMARY KEY,
    weight_class VARCHAR(50),
    fighter_id INT REFERENCES Fighter(fighter_id),
    rank INT
);
