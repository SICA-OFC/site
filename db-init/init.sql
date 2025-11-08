-- ============================
-- 1. CURSOS
-- ============================
CREATE TABLE cursos (
    id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sigla     VARCHAR(10)   NOT NULL,
    ano       INTEGER       NOT NULL,
    nome      VARCHAR(100)  NOT NULL,
    periodo   INTEGER       NOT NULL CHECK (periodo BETWEEN 1 AND 3)
);

INSERT INTO cursos (sigla, ano, nome, periodo) VALUES
('1AM', 1, 'Administração M-tec', 1),
('2AM', 2, 'Administração M-tec', 1),
('3AM', 3, 'Administração M-tec', 1),
('1BM', 1, 'Mecânica M-tec', 1),
('2BM', 2, 'Mecânica M-tec', 1),
('3BM', 3, 'Mecânica M-tec', 1),
('1DM', 1, 'Eletrônica M-tec', 1),
('3DM', 3, 'Eletrônica M-tec', 1),
('1EM', 1, 'Desenvolvimento de Sistemas M-tec', 1),
('2EM', 2, 'Desenvolvimento de Sistemas M-tec', 1),
('3EM', 3, 'Desenvolvimento de Sistemas M-tec', 1),
('1FM', 1, 'Mecatrônica M-tec', 1),
('2FM', 2, 'Mecatrônica M-tec', 1),
('3FM', 3, 'Mecatrônica M-tec', 1),
('1AT', 1, 'Administração M-tec', 2),
('2AT', 2, 'Administração M-tec', 2),
('3AT', 3, 'Administração M-tec', 2),
('1CT', 1, 'Automação M-tec', 2),
('2CT', 2, 'Automação M-tec', 2),
('3CT', 3, 'Automação M-tec', 2),
('1FT', 1, 'Mecatrônica M-tec', 2),
('2FT', 2, 'Mecatrônica M-tec', 2),
('3FT', 3, 'Mecatrônica M-tec', 2),
('1GT', 1, 'Desenvolvimento de Sistemas Ptech', 2),
('2GT', 2, 'Desenvolvimento de Sistemas Ptech', 2),
('3GT', 3, 'Desenvolvimento de Sistemas Ptech', 2),
('1HT', 1, 'Informática M-tec', 2),
('2HT', 2, 'Informática M-tec', 2),
('3HT', 3, 'Informática M-tec', 2),
('1BN', 1, 'Mecânica M-tec-N', 3),
('1DN', 1, 'Eletrônica M-tec-N', 3),
('2DN', 2, 'Eletrônica M-tec-N', 3),
('1FN', 1, 'Automação M-tec-N', 3);

-- ============================
-- 2. USUÁRIOS
-- ============================
CREATE TYPE tipo_usuario AS ENUM (
  'aluno',
  'professor',
  'coordenador',
  'diretor',
  'visitante'
);

CREATE TABLE usuarios (
  id                    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rm                    VARCHAR(5)     NOT NULL UNIQUE,
  nome                  VARCHAR(100)   NOT NULL,
  data_nascimento       DATE,
  curso_id              INTEGER        NULL,
  email                 VARCHAR(255)   NOT NULL UNIQUE,
  senha                 TEXT           NOT NULL,
  telefone              VARCHAR(15)    NOT NULL,
  foto_perfil           TEXT           NULL,
  criado_em             TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  atualizado_em         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  codigo_verificacao    INTEGER CHECK (codigo_verificacao BETWEEN 100000 AND 999999),
  codigo_gerado_em      TIMESTAMP WITH TIME ZONE,
  tentativas_login      INTEGER        NOT NULL DEFAULT 0,
  tipo_usuario          tipo_usuario   NOT NULL DEFAULT 'aluno',
  
  -- FK → cursos
  CONSTRAINT fk_usuario_curso
    FOREIGN KEY (curso_id)
    REFERENCES cursos (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- ============================
-- 3. MODALIDADES
-- ============================
CREATE TABLE modalidades (
    id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome  VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO modalidades (nome) VALUES
('Futebol'),
('Vôlei'),
('Basquete'),
('Natação');

-- ============================
-- 4. USUÁRIO_MODALIDADES (N:N)
-- ============================
CREATE TABLE usuario_modalidades (
    usuario_id     INTEGER NOT NULL,
    modalidade_id  INTEGER NOT NULL,
    PRIMARY KEY (usuario_id, modalidade_id),

    -- FK → usuarios
    CONSTRAINT fk_usuario_modalidade_usuario
      FOREIGN KEY (usuario_id)
      REFERENCES usuarios (id)
      ON DELETE CASCADE,

    -- FK → modalidades
    CONSTRAINT fk_usuario_modalidade_modalidade
      FOREIGN KEY (modalidade_id)
      REFERENCES modalidades (id)
      ON DELETE CASCADE
);

-- ============================
-- 5. TIMES
-- ============================
CREATE TABLE times (
  id              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome            VARCHAR(100) NOT NULL UNIQUE,
  modalidade_id   INTEGER NULL,
  
  -- FK → modalidades
  CONSTRAINT fk_time_modalidade
    FOREIGN KEY (modalidade_id)
    REFERENCES modalidades (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- ============================
-- 6. MEMBROS DO TIME (N:N entre usuarios e times)
-- ============================
CREATE TYPE tipo_funcao AS ENUM (
  'capitao',
  'jogador',
  'reserva'
);

CREATE TABLE membros_time (
    time_id     INTEGER NOT NULL,
    membro_id   INTEGER NOT NULL,
    funcao      tipo_funcao,

    PRIMARY KEY (time_id, membro_id),

    -- FK → times
    CONSTRAINT fk_membro_time
      FOREIGN KEY (time_id)
      REFERENCES times (id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT,

    -- FK → usuarios
    CONSTRAINT fk_membro_usuario
      FOREIGN KEY (membro_id)
      REFERENCES usuarios (id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT
);

-- ============================
-- 7. TRIGGER (atualizar 'atualizado_em' em USUÁRIOS)
-- ============================
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
