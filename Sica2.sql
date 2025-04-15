create database sica;
drop database sica;
use sica;

create table Cadastro 
(
RM		int(6) primary key not null,
Nome	varchar(30) not null,
Curso	varchar(20) not null,
Email	varchar(30) not null unique,
Senha	varchar(20) not null,
Telefone varchar(20) not null
);

ALTER TABLE Cadastro
ADD CONSTRAINT min_Senha CHECK (LENGTH(Senha) >= 8),
ADD CONSTRAINT min_Nome CHECK (LENGTH(Nome) >= 10);