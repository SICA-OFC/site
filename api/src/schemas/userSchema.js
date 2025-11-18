const Joi = require("joi");

const userSchema = Joi.object({
  rm: Joi.number().integer().min(10000).max(99999).required().messages({
    "any.required": "O RM é obrigatório.",
    "number.base": "O RM deve ser um número.",
    "number.min": "O RM deve conter exatamente 5 dígitos numéricos.",
    "number.max": "O RM deve conter exatamente 5 dígitos numéricos.",
  }),

  nome: Joi.string()
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .min(8)
    .max(100)
    .required()
    .messages({
      "any.required": "O nome é obrigatório.",
      "string.base": "O nome deve ter apenas letras.",
      "string.empty": "O nome não pode estar vazio.",
      "string.pattern.base": "O nome não pode conter caracteres especiais ou números.",
      "string.min": "O nome deve ter pelo menos 8 caracteres.",
      "string.max": "O nome deve ter no máximo 100 caracteres.",
    }),

  curso_id: Joi.number().integer().messages({
    "number.base": "O curso deve ser um ID de curso válido.",
  }),

  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._]+@(gmail\.com|hotmail\.com|etec\.sp\.gov\.br)$/)
    .required()
    .messages({
      "any.required": "O email é obrigatório.",
      "string.empty": "O email não pode estar vazio.",
      "string.email": "O email deve ser válido.",
      "string.pattern.base": "O email deve ser do domínio gmail.com, hotmail.com ou etec.sp.gov.br",
    }),

  data_nascimento: Joi.date().timestamp("javascript").less("now").iso().required().messages({
    "any.required": "A data de nascimento é obrigatória.",
    "date.base": "A data de nascimento deve ser uma data válida.",
    "date.less": "A data de nascimento deve ser anterior à data atual.",
  }),

  senha: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).{6,}$/)
    .required()
    .messages({
      "any.required": "A senha é obrigatória.",
      "string.base": "A senha deve ser válida.",
      "string.empty": "A senha não pode estar vazia.",
      "string.min": "A senha deve ter pelo menos 8 caracteres.",
      "string.max": "A senha deve ter no máximo 100 caracteres.",
      "string.pattern.base":
        "A senha deve ter pelo menos 6 caracteres, incluindo 1 letra maiúscula, 1 número e 1 caractere especial.",
    }),

  telefone: Joi.string()
    .pattern(/^(\(\d{2}\)\s)(9?\d{4}\-\d{4})$/)
    .min(14)
    .max(15)
    .required()
    .messages({
      "any.required": "O telefone é obrigatório.",
      "string.base": "O telefone deve ser válido.",
      "string.empty": "O telefone não pode estar vazio.",
      "string.pattern.base": "O telefone deve estar no formato (yy) 9xxxx-xxxx ou (yy) xxxx-xxxx.",
    }),

  codigo: Joi.string().valid("79e1e974d00b9620e59aedf0ce8a5f73ea5ef8e740987f58df20a9917e7dd233").messages({
    "any.only": "O código fornecido é inválido.",
    "string.base": "O código deve ser válido.",
  }),

  modalidades: Joi.array()
    .items(Joi.number().integer().positive().messages({
      "number.base": "O ID da modalidade é inválido",
    }))
    .unique()
    .required()
    .default([])
    .messages({
      "any.required": "Escolha, pelo menos, 1 modalidade de interesse.",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._]+@(gmail\.com|hotmail\.com|etec\.sp\.gov\.br)$/)
    .required()
    .messages({
      "any.required": "O email é obrigatório.",
      "string.empty": "O email não pode estar vazio.",
      "string.email": "O email deve ser válido.",
      "string.pattern.base": "O email deve ser do domínio gmail.com, hotmail.com ou etec.sp.gov.br",
    }),

  senha: Joi.string()
    .required()
    .messages({
      "any.required": "A senha é obrigatória.",
      "string.base": "A senha deve ser válida.",
      "string.empty": "A senha não pode estar vazia.",
    }),
});

const editUserSchema = Joi.object({
  nome: Joi.string()
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .min(8)
    .max(100)
    .required()
    .messages({
      "any.required": "O nome é obrigatório.",
      "string.base": "O nome deve ter apenas letras.",
      "string.empty": "O nome não pode estar vazio.",
      "string.pattern.base": "O nome não pode conter caracteres especiais ou números.",
      "string.min": "O nome deve ter pelo menos 8 caracteres.",
      "string.max": "O nome deve ter no máximo 100 caracteres.",
    }),

  curso_id: Joi.number().integer().required().messages({
    "any.required": "O curso é obrigatório.",
    "number.base": "O curso deve ser um ID de curso válido.",
  }),

  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._]+@(gmail\.com|hotmail\.com|etec\.sp\.gov\.br)$/)
    .required()
    .messages({
      "any.required": "O email é obrigatório.",
      "string.empty": "O email não pode estar vazio.",
      "string.email": "O email deve ser válido.",
      "string.pattern.base": "O email deve ser do domínio gmail.com, hotmail.com ou etec.sp.gov.br",
    }),

  data_nascimento: Joi.date().timestamp("javascript").less("now").iso().required().messages({
    "any.required": "A data de nascimento é obrigatória.",
    "date.base": "A data de nascimento deve ser uma data válida.",
    "date.less": "A data de nascimento deve ser anterior à data atual.",
  }),

  telefone: Joi.string()
    .pattern(/^(\(\d{2}\)\s)(9?\d{4}\-\d{4})$/)
    .min(14)
    .max(15)
    .required()
    .messages({
      "any.required": "O telefone é obrigatório.",
      "string.base": "O telefone deve ser válido.",
      "string.empty": "O telefone não pode estar vazio.",
      "string.pattern.base": "O telefone deve estar no formato (yy) 9xxxx-xxxx ou (yy) xxxx-xxxx.",
    }),

  modalidades: Joi.array()
    .items(Joi.number().integer().positive().messages({
      "number.base": "O ID da modalidade é inválido",
    }))
    .unique()
    .required()
    .default([])
    .messages({
      "any.required": "Escolha, pelo menos, 1 modalidade de interesse.",
    }),
});

const verifySchema = Joi.object({
  codigo_verificacao: Joi.number().integer().min(100000).max(999999).required().messages({
    "any.required": "O código é obrigatório.",
    "number.base": "O código deve ser um número.",
    "number.min": "O código deve conter exatamente 6 dígitos numéricos.",
    "number.max": "O código deve conter exatamente 6 dígitos numéricos.",
  }),
});

module.exports = { userSchema, loginSchema, editUserSchema, verifySchema };
