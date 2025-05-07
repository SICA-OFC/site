create database sica;
drop database sica;
use sica;

create table Aluno 
(
id    serial primary key,
RM		int(6) not null unique,
Nome	varchar(30) not null,
Curso	varchar(20) not null,
Email	varchar(30) not null,
Senha	text not null,
Tell 	varchar(20) not null,
dataCriacao timestamp default CURRENT_TIMESTAMP
verificado BOOLEAN DEFAULT FALSE,
codigoVerificacao INTEGER,
dataCriacaoCodigo TIMESTAMP
);

ALTER TABLE Aluno
ADD CONSTRAINT min_Senha CHECK (LENGTH(Senha) >= 8),
ADD CONSTRAINT min_Nome CHECK (LENGTH(Nome) >= 10);

create table Prof 
(
RM		serial primary key,
Nome	varchar(30) not null,
Email	varchar(30) not null unique,
Senha	varchar(20) not null,
Tell 	varchar(20) not null
);

ALTER TABLE Prof
ADD CONSTRAINT min_Senha CHECK (LENGTH(Senha) >= 8),
ADD CONSTRAINT min_Nome CHECK (LENGTH(Nome) >= 10);

create table Agendamento
(
id serial Primary key,
Prof int(6) not null,
constraint FK_AgenProf foreign key (Prof) references Prof(RM),
data_hora Timestamp not null default current_timestamp,
descri varchar(200) not null, -- descrição é o que vai ser feito, ex: partida de volei entre o 3DS e o 3MH
estado varchar(100) default 'Pendente' -- estado = pendente, concluido, cancelado etc
);

create table Time
(
  id     serial primary key,
  Nome   varchar(30) not null,
  dataCriacao timestamp default current_timestamp
);

create table TimeAluno
  (
  cod    serial primary key,
  Time   int(10) not null,
  constraint FK_TimeTA foreign key (Time) references Time(id),
  Aluno  integer not null,
  constraint FK_AlunoTA foreign key (Aluno) references Aluno(id)
  );



create table Jogo -- time, Agendamento, Esporte
  (
  id  serial primary key
  
  );

SELECT * FROM Cadastro;
