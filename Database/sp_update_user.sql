CREATE PROCEDURE sp_update_user(
@id VARCHAR(100),
@username  VARCHAR(100),
@full_name  VARCHAR(100),
@phone_number VARCHAR(13),
@email  VARCHAR(100),
@password VARCHAR(50),
@is_admin INT,
@is_deleted INT,
@is_sent INT)
AS 
UPDATE [Send it].[dbo].[users] SET username = @username, full_name = @full_name, phone_number = @phone_number, email = @email,
password = @password, is_admin = @is_admin , is_deleted = @is_deleted, is_sent = @is_sent WHERE id=@id AND is_deleted = 0; 
