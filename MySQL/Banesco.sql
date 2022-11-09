create database Banesco_POS_MPOS;
create user Banesco_User;
GRANT ALL PRIVILEGES ON Banesco_POS_MPOS TO 'Banesco_User';
use Banesco_POS_MPOS;

#Lo que esta comentado se implementara a futuro#

create table Customer (
	docText varchar (15) not null,
		constraint Cliente_docText_pk primary key (docText),
	accountNumber char (12) not null,
		constraint Cliente_accountNumber_un unique key (accountNumber),
    serviceType varchar (5) not null,
    fName varchar (20) not null,
    lName varchar (20) not null,
    clientType varchar (20) not null,
    email varchar (35) not null,
    phone char (9) not null,
    address varchar (35) not null,
    localITBMS varchar (5) not null, 
    Firma varchar (65)
);


create table Company (
	merchantID char (12) not null,
		constraint Company_mechantID_pk primary key (merchantID),
	RUCNumber char (13) not null,
		constraint Company_RUCNumber_un unique key (RUCNumber),
	localType varchar (12) not null,
    socialReason varchar (20) not null,
    comercialActivity varchar (20) not null,
    province varchar (20) not null,
    city varchar (20) not null,
    district varchar (20) not null,
    correg varchar (30) not null,
    street varchar (20) not null,
    localNumber int not null,
    localPhone varchar (9) not null
);




create table Records (
	recordID char (10) not null,
		constraint Records_recordID_pk primary key (recordID),
	docFile varchar (65) not null,
    noticeOperation varchar (65) not null,
    #Acta_Asamblea_Accionistas varchar (65) not null#
    localDGI varchar (65) not null,
    publicRecord varchar (65) not null,
    localFachada varchar (65) not null,
    localMerchandise varchar (65) not null,
    localPOSplace varchar (65) not null
    #Recibo_Utilidades_Residencia varchar (65) not null,#
    #Carne_Artesano varchar (65) not null,#
    #Registro_Vehicular_Transito varchar (65) not null#
);

#create table Branch_Office (
	#branchID int auto_increment not null,
		#constraint Branch_Office_branchID_pk primary key (branchID)
	#merchantID char (12) not null#
		#constraint Branch_Office_mechant_ID_fk foreign key (merchantID)#
        #references Company (merchantID)#
	#razonComercial varchar (20) not null,#
    #phone varchar (9) not null,#
    #accountNumber int (12) not null REVISAR NOMBRE DE VARIABLE,#
		#constraint Cliente_accountNumber_un unique key (accountNumber),#
	#cantidadPOS_MPOS int not null,#
    #terminalID int (12) not null,#
		#constraint Branch_Office_terminalID_un unique key (terminalID)#
	#);

create table Customer_Company_Records (
	docText char (15) not null,
		constraint Customer_Company_Records_docText_fk foreign key (docText)
			references Customer (docText),
	recordID char (10) not null,
		constraint Customer_Company_Records_recordID_Expediente_fk foreign key (recordID)
        references Records (recordID),
	merchantID char (12) not null,
		constraint Customer_Company_Records_merchantID_fk foreign key (merchantID)
		references Company (merchantID),
	
    constraint Customer_Company_Records_docText_recordID_pk primary key (docText, recordID)
);



    

