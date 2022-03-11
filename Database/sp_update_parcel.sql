CREATE PROCEDURE sp_update_parcel(
@id VARCHAR(100),
@description  VARCHAR(200),
@sender_number  VARCHAR(13),
@receiver_number VARCHAR(100),
@start_location  VARCHAR(100),
@end_location VARCHAR(100),
@is_deleted INT,
@is_updated INT,
@is_sent  INT,
@is_delivered INT,
@current_location INT,
@sender_id VARCHAR(100))
AS 
UPDATE [Send it].[dbo].[parcels] SET description=@description, sender_number = @sender_number,receiver_number = @receiver_number,
start_location = @start_location, end_location = @end_location, is_deleted = @is_deleted, is_updated = @is_updated,
is_sent = @is_sent, is_delivered = @is_delivered, @current_location = @current_location, sender_id = @sender_id WHERE id=@id AND
@is_deleted = 0; 
