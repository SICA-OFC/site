CREATE TYPE periodo_enum AS ENUM ('Manhã','Tarde','Noite');

CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    sigla VARCHAR(10) NOT NULL,
    ano INTEGER NOT NULL,
    nome VARCHAR(100) NOT NULL,
    periodo periodo_enum NOT NULL
);

INSERT INTO cursos (sigla, ano, nome, periodo) VALUES
('1AM', 1, 'Administração M-tec', 'Manhã'),
('2AM', 2, 'Administração M-tec', 'Manhã'),
('3AM', 3, 'Administração M-tec', 'Manhã'),
('1BM', 1, 'Mecânica M-tec', 'Manhã'),
('2BM', 2, 'Mecânica M-tec', 'Manhã'),
('3BM', 3, 'Mecânica M-tec', 'Manhã'),
('1DM', 1, 'Eletrônica M-tec', 'Manhã'),
('3DM', 3, 'Eletrônica M-tec', 'Manhã'),
('1EM', 1, 'Desenvolvimento de Sistemas M-tec', 'Manhã'),
('2EM', 2, 'Desenvolvimento de Sistemas M-tec', 'Manhã'),
('3EM', 3, 'Desenvolvimento de Sistemas M-tec', 'Manhã'),
('1FM', 1, 'Mecatrônica M-tec', 'Manhã'),
('2FM', 2, 'Mecatrônica M-tec', 'Manhã'),
('3FM', 3, 'Mecatrônica M-tec', 'Manhã'),
('1AT', 1, 'Administração M-tec', 'Tarde'),
('2AT', 2, 'Administração M-tec', 'Tarde'),
('3AT', 3, 'Administração M-tec', 'Tarde'),
('1CT', 1, 'Automação M-tec', 'Tarde'),
('2CT', 2, 'Automação M-tec', 'Tarde'),
('3CT', 3, 'Automação M-tec', 'Tarde'),
('1FT', 1, 'Mecatrônica M-tec', 'Tarde'),
('2FT', 2, 'Mecatrônica M-tec', 'Tarde'),
('3FT', 3, 'Mecatrônica M-tec', 'Tarde'),
('1GT', 1, 'Desenvolvimento de Sistemas Ptech', 'Tarde'),
('2GT', 2, 'Desenvolvimento de Sistemas Ptech', 'Tarde'),
('3GT', 3, 'Desenvolvimento de Sistemas Ptech', 'Tarde'),
('1HT', 1, 'Informática M-tec', 'Tarde'),
('2HT', 2, 'Informática M-tec', 'Tarde'),
('3HT', 3, 'Informática M-tec', 'Tarde'),
('1BN', 1, 'Mecânica M-tec-N', 'Noite'),
('1DN', 1, 'Eletrônica M-tec-N', 'Noite'),
('2DN', 2, 'Eletrônica M-tec-N', 'Noite'),
('1FN', 1, 'Automação M-tec-N', 'Noite');

CREATE TYPE tipo_usuario AS ENUM ('Aluno','Professor','Coordenador','Diretor','Visitante');

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    rm VARCHAR(5) NOT NULL,
    nome VARCHAR(30) NOT NULL,
    curso BIGINT UNSIGNED REFERENCES cursos(id) NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    dataNascimento DATE NOT NULL,
    dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verificado BOOLEAN DEFAULT FALSE,
    codigoVerificacao INTEGER,
    dataCriacaoCodigo TIMESTAMP,
    controle INTEGER,
    tipoUsuario tipo_usuario
);

SELECT u.*, c.nome FROM public.usuario u INNER JOIN public.cursos c ON u.curso = c.id ORDER BY c.id ASC;
DROP TABLE public.usuario;

SELECT * FROM public.cursos ORDER BY periodo, SUBSTRING(sigla FROM 2), ano ASC;
DROP TABLE public.cursos;

ALTER TABLE usuario
ADD CONSTRAINT min_senha CHECK (LENGTH(senha) >= 8),
ADD CONSTRAINT min_nome CHECK (LENGTH(nome) >= 10);


create table Agendamento (
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

create table Campeonato
(
    id serial primary key,
    nome varchar(30) not null,
    Esporte BIGINT UNSIGNED NOT NULL,
    CONSTRAINT FK_CampEspor foreign key (Esporte) references Esporte(id)
);

create table CampJogo
    (
    id serial primary key,
    Campeonato bigint unsigned not null,
    Jogo bigint unsigned not null,
    constraint FK_CampJogo foreign key (Campeonato) references Campeonato(id),
    constraint FK_CampeJogo foreign key (Jogo) references Jogo(id)
    );

create table CampTime
(
    id serial primary key,
    Campeonato bigint unsigned not null,
    Time bigint unsigned not null,
    constraint FK_CampTime foreign key (Campeonato) references Campeonato(id),
    constraint FK_CampeTime foreign key (Time) references Time(id)
    );
