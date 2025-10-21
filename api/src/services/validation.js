import { check } from "express-validator";

export const signInValidation = [
    check('rm', 'RM Inválido').isInt().isLength({ min: 5, max: 5 }).trim().escape(),
    check('nome', 'Nome Inválido').isAlpha('pt-BR').trim().escape(),
    check('curso_id', 'Curso Inválido').isInt({ min: 1, max: 50 }),
    check('email', 'Email Inválido').isEmail().trim().escape().normalizeEmail(),
    check('data_nascimento', 'Data de Nascimento Inválida').trim().escape(),
    check('senha', 'Senha Inválida').isLength({ min: 8 }).withMessage('Sua senha deve ter pelo menos 8 caracteres').matches('[0-9]').withMessage('Sua senha deve ter pelo menos 1 número').matches('[A-Z]').withMessage('Sua senha deve ter pelo menos 1 letra maiúscula').trim().escape(),
    check('telefone', 'Telefone Inválido').isLength({ min: 13, max: 15 }).trim().escape(),
    check('modalidades', 'Modalidade Inválida').isJSON().trim().escape(),
]

export const LoginValidation = [
    check('email', 'Email Inválido').isEmail().trim().escape().normalizeEmail(),
    check('senha', 'Senha Inválida').trim().escape(),
]
