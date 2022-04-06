CREATE PROCEDURE sp_create_user(
  @id VARCHAR(100),
  @username  VARCHAR(100),
  @full_name  VARCHAR(100),
  @phone_number VARCHAR(13),
  @email VARCHAR(100),
  @password VARCHAR(60),
  @is_admin INT,
  @is_deleted INT,
  @is_sent  INT) 
AS
INSERT INTO [Send it].[dbo].[users] VALUES (@id,@username,@full_name,@phone_number,@email,@password,@is_admin,@is_deleted,
  @is_sent);