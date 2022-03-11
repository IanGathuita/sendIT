CREATE PROCEDURE sp_get_parcels
AS
SELECT * FROM [Send it].[dbo].[parcels] WHERE is_deleted = 0;