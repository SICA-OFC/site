create database sica;
drop database sica;
use sica;

create table Aluno 
(
id      serial not null primary key,
rm		int(6) not null unique,
nome	varchar(30) not null,
curso	varchar(20) not null,
email	varchar(30) not null,
senha	text not null,
tell 	varchar(20) not null,
nascimento date not null,
dataCriacao timestamp default CURRENT_TIMESTAMP,
verificado BOOLEAN DEFAULT FALSE,
codigoVerificacao INTEGER,
dataCriacaoCodigo TIMESTAMP default CURRENT_TIMESTAMP
);

ALTER TABLE Aluno
ADD CONSTRAINT min_senha CHECK (LENGTH(senha) >= 8),
ADD CONSTRAINT min_nome CHECK (LENGTH(nome) >= 10);

create table Prof 
(
id    serial primary key,
rm		int(6),
nome	varchar(30) not null,
email	varchar(30) not null unique,
senha	varchar(20) not null,
tell 	varchar(20) not null,
dataCriacao timestamp default CURRENT_TIMESTAMP,
verificado BOOLEAN DEFAULT FALSE,
codigoVerificacao INTEGER,
dataCriacaoCodigo TIMESTAMP default CURRENT_TIMESTAMP
);

ALTER TABLE Prof
ADD CONSTRAINT min_senha CHECK (LENGTH(senha) >= 8),
ADD CONSTRAINT min_nome CHECK (LENGTH(nome) >= 10);

create table Agendamento
(
id serial Primary key,
data_hora Timestamp not null default current_timestamp,
descri varchar(200) not null, -- descrição é o que vai ser feito, ex: partida de volei entre o 3DS e o 3MH
estado varchar(100) default 'Pendente' -- estado = pendente, concluido, cancelado etc
);

create table Peneira 
(
id serial primary key,
Esporte bigint unsigned not null,
constraint FK_PenEspor foreign key (Esporte) references Esporte(id),
Aluno bigint unsigned not null,
constraint FK_PenAlu foreign key (Aluno) references Aluno(id),
Classific varchar(10) not null default 'Indefinido', -- aprovado, reprovado, indefinido?
dataInicio timestamp default current_timestamp,
dataFim timestamp default current_timestamp
);

create table Time
(
  id     serial not null primary key,
  nome   varchar(30) not null,
  dataCriacao timestamp default current_timestamp,
  divisao varchar(30) default 'sub-15' -- sub-15, sub-16, sub-17
);

create table TimeAlu
  (
  id    serial primary key,
  Time   BIGINT UNSIGNED not null,
  Aluno  BIGINT UNSIGNED not null,
CONSTRAINT FK_TimeTA FOREIGN KEY (Time) REFERENCES Time(id),
  CONSTRAINT FK_AlunoTA FOREIGN KEY (Aluno) REFERENCES Aluno(id)
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
Esporte BIGINT UNSIGNED not null,
constraint FK_EsporTimeAlu foreign key (Esporte) references Esporte(id),
Time BIGINT UNSIGNED,
constraint FK_EsporTime foreign key (Time) references Time(id),
Aluno BIGINT UNSIGNED,
constraint FK_EsporAlu foreign key (Aluno) references Aluno(id)
);

create table Jogo
  (
  id  serial primary key,
  Prof BIGINT UNSIGNED,
  constraint FK_JogoProf foreign key(Prof) references Prof(id),
  Esporte BIGINT UNSIGNED not null,
  constraint FK_JogoEspor foreign key (Esporte) references Esporte(id),
  Agendamento BIGINT UNSIGNED not null,
  constraint FK_JogoAgen foreign key (Agendamento) references Agendamento(id),
  Time1 BIGINT UNSIGNED,
  Time2 BIGINT UNSIGNED,
  constraint FK_JogoTime1 foreign key (Time1) references Time(id),
  constraint FK_JogoTime2 foreign key (Time2) references Time(id),
  Aluno1 BIGINT UNSIGNED,
  Aluno2 BIGINT UNSIGNED,
  constraint FK_JogoAlu1 foreign key (Aluno1) references Aluno(id),
  constraint FK_JogoAlu2 foreign key (Aluno2) references Aluno(id)
  );
