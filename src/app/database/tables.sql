/* creating user*/
CREATE TABLE user (
    userId int primary key identity(1,1),
    userEmail varchar(50),
    userPassword varchar(225)
    firstname varchar(50),
    lastname varchar(50),
    userRole varchar(20),
    userBlock bit default 0,
    userPermission bit default 1,
    statusId int foreign key references [dbo].[ApprovalStatus](statusId),
) 

/* creating approval statuses*/
CREATE TABLE ApprovalStatus(
    statusId int primary key identity(1,1),
    statusName varchar(50),   
)

INSERT INTO [dbo].[ApprovalStatus] values('Pending','Approved','Rejected')

/* creating post*/
CREATE TABLE post(
    postId int primary key identity(1,1),
    userId int foreign key references [dbo].[user](userId),
    companyName varchar(50),
    postContent text(1000),
    statusId int foreign key references [dbo].[ApprovalStatus](statusId),
    activeStatus bit default 1,
    fundingAmount money,
    opportunityType varchar(20),
    applicationDeadline DATE
)
/* creating post application*/
CREATE TABLE postApplication(
    applicationId int primary key identity(1,1),
    postId int foreign key references [dbo].[post](postId),
    userId int foreign key references [dbo].[user](userId),
    statusId int foreign key references [dbo].[ApprovalStatus](statusId),
)