CREATE TABLE users(
id VARCHAR(100) PRIMARY KEY,
username  VARCHAR(100),
full_name  VARCHAR(100),
phone_number VARCHAR(13),
email  VARCHAR(100),
password VARCHAR(50),
is_admin INT DEFAULT 0,
is_deleted INT DEFAULT 0,
is_sent  INT DEFAULT 0
);

--added a constraint to make email column unique.
ALTER TABLE [Send it].[dbo].[users] ADD CONSTRAINT UQ_email UNIQUE(email);
--changed length to 60 so that a bcrypt hashed password can 'fit' in the column
ALTER TABLE [Send it].[dbo].[users] ALTER COLUMN password VARCHAR(60);