-- Kjør denne én gang i den nye databasen på Render
CREATE TABLE IF NOT EXISTS bokhylle (
    bokid     SERIAL PRIMARY KEY,
    tittel    VARCHAR NOT NULL,
    forfatter VARCHAR NOT NULL,
    status    TEXT NOT NULL
);
