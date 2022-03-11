CREATE PROCEDURE sp_get_a_user(@email VARCHAR(200))
AS
SELECT TOP 1 * FROM [Send it].[dbo].[users]  WHERE email=@email;