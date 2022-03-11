CREATE PROCEDURE sp_get_a_parcel(@id VARCHAR(100))
AS
SELECT TOP 1 * FROM [Send it].[dbo].[parcels]  WHERE id=@id AND is_deleted = 0 ;