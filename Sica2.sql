create database sica;
drop database sica;
use sica;

create table Aluno 
(
id    serial primary key,
rm		int(6) not null unique,
nome	varchar(30) not null,
curso	varchar(20) not null,
email	varchar(30) not null,
senha	text not null,
tell 	varchar(20) not null,
dataCriacao timestamp default CURRENT_TIMESTAMP,
verificado BOOLEAN DEFAULT FALSE,
codigoVerificacao INTEGER,
dataCriacaoCodigo TIMESTAMP
);

ALTER TABLE Aluno
ADD CONSTRAINT min_senha CHECK (LENGTH(senha) >= 8),
ADD CONSTRAINT min_nome CHECK (LENGTH(nome) >= 10);

create table Prof 
(
id    serial primary key,
rm		int(6) primary key,
nome	varchar(30) not null,
email	varchar(30) not null unique,
senha	varchar(20) not null,
tell 	varchar(20) not null,
dataCriacao timestamp default CURRENT_TIMESTAMP,
verificado BOOLEAN DEFAULT FALSE,
codigoVerificacao INTEGER,
dataCriacaoCodigo TIMESTAMP
);

ALTER TABLE Prof
ADD CONSTRAINT min_senha CHECK (LENGTH(senha) >= 8),
ADD CONSTRAINT min_nome CHECK (LENGTH(nome) >= 10);

create table Agendamento
(
id serial Primary key,
prof integer not null,
constraint FK_AgenProf foreign key (prof) references Prof(id),
data_hora Timestamp not null default current_timestamp,
descri varchar(200) not null, -- descrição é o que vai ser feito, ex: partida de volei entre o 3DS e o 3MH
estado varchar(100) default 'Pendente' -- estado = pendente, concluido, cancelado etc
);

create table Time
(
  id     serial primary key,
  nome   varchar(30) not null,
  dataCriacao timestamp default current_timestamp
);

create table TimeAluno
  (
  id    serial primary key,
  Time   integer not null,
  constraint FK_TimeTA foreign key (Time) references Time(id),
  aluno  integer not null,
  constraint FK_AlunoTA foreign key (Aluno) references Aluno(id)
  );

create table Esporte
(
 id serial Primary key,
 Nome varchar(20) not null,
 dataCriacao timestamp default current_timestamp
);

create table EsporTimeAlu
(
id serial Primary key,
Esporte integer not null,
constraint FK_EsporTimeAlu foreign key (Esporte) references Esporte(id),
Time integer,
constraint FK_EsporTime foreign key (Time) references Time(id),
Aluno integer,
constraint FK_EsporAlu foreign key (Aluno) references Aluno(id)
);

create table Jogo -- time, Agendamento, Esporte, aluno
  (
  id  serial primary key
  );

SELECT * FROM Cadastro;
