CREATE PROCEDURE sp_get_users
AS
SELECT * FROM [Send it].[dbo].[users] WHERE is_deleted = 0;