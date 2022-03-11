CREATE TABLE parcels(
id VARCHAR(100) PRIMARY KEY,
description  VARCHAR(200),
sender_number  VARCHAR(13),
receiver_number VARCHAR(100),
start_location  VARCHAR(100),
end_location VARCHAR(100),
is_deleted INT DEFAULT 0,
is_updated INT DEFAULT 0,
is_sent  INT DEFAULT 0,
is_delivered INT DEFAULT 0,
current_location VARCHAR(100),
sender_id VARCHAR(100) FOREIGN KEY(id) REFERENCES [Send it].[dbo].[users]
);