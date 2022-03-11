CREATE PROCEDURE sp_delete_parcel(@id VARCHAR(100),@is_deleted INT) 
AS 
UPDATE [Send it].[dbo].[parcels] SET is_deleted = @is_deleted WHERE id=@id AND is_deleted = 0;