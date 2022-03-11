CREATE PROCEDURE sp_create_parcel(
  @id VARCHAR(100),
  @description  VARCHAR(200),
  @sender_number  VARCHAR(13),
  @receiver_number VARCHAR(100),
  @start_location  VARCHAR(100),
  @end_location VARCHAR(100),
  @is_deleted INT,
  @is_updated INT,
  @is_sent  INT,
  @is_delivered VARCHAR(100),
  @current_location VARCHAR(100),
  @sender_id VARCHAR(100)) 
AS
INSERT INTO [Send it].[dbo].[parcels] VALUES (@id,@description,@sender_number,@receiver_number,@start_location,@end_location,@is_deleted,
  @is_updated,@is_sent,@is_delivered,@current_location,@sender_id);