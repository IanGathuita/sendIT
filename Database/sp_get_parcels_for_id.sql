CREATE PROCEDURE sp_get_parcels_for_id(@sender_id VARCHAR(100))
AS
SELECT * FROM [Send it].[dbo].[parcels] WHERE @sender_id = @id AND is_deleted = 0;