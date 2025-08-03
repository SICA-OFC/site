-- 1. cursos
CREATE TYPE periodo_escolar AS ENUM ('Manhã','Tarde','Noite');

CREATE TABLE cursos (
    id      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sigla   VARCHAR(10)     NOT NULL,
    ano     INTEGER NOT     NULL,
    nome    VARCHAR(100)    NOT NULL,
    periodo periodo_escolar NOT NULL
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

-- 2. usuarios
CREATE TYPE tipo_usuario AS ENUM (
  'aluno',
  'professor',
  'coordenador',
  'diretor',
  'visitante'
);

CREATE TABLE usuarios (
  id                       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rm         		           VARCHAR(5)    NOT NULL UNIQUE,
  nome			               VARCHAR(100)   NOT NULL,
  data_nascimento          DATE,
  curso_id                 INTEGER        NOT NULL
    REFERENCES cursos(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  email                    VARCHAR(255)   NOT NULL UNIQUE,
  senha                    TEXT           NOT NULL,
  telefone                 VARCHAR(15),
  criado_em                TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  atualizado_em            TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verificado               BOOLEAN        NOT NULL DEFAULT FALSE,
  codigo_verificacao       INTEGER CHECK (codigo_verificacao BETWEEN 100000 AND 999999),
  codigo_gerado_em        TIMESTAMP WITH TIME ZONE,
  tentativas_login         INTEGER        NOT NULL DEFAULT 0,
  tipo_usuario             tipo_usuario   NOT NULL
);

-- Função e trigger para atualizar atualizado_em em projetos
CREATE OR REPLACE FUNCTION atualizar_data_modificacao()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER atualiza_data_usuario
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION atualizar_data_modificacao();
