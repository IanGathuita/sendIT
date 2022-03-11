CREATE PROCEDURE sp_delete_user(@id VARCHAR(100),@is_deleted INT) 
AS 
UPDATE [Send it].[dbo].[users] SET is_deleted = @is_deleted WHERE id=@id AND is_deleted = 0;