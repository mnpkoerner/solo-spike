-- name database: time-lord


-- user table unused for spike
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"user_name" varchar(255)
);

DROP TABLE "event";

-- insert hours using military time (24 hour clock for hours)
-- server side SQL queries need to be more sophisticaed for the final
-- but they worked well enough in the rough draft to work out functionality

CREATE TABLE "event" (
	"id" SERIAL PRIMARY KEY,
	"start_time_hour" INT,
	"start_time_minute" INT,
	"duration" INT,
	"attended" INT,
	"koan" VARCHAR(1000)
);
