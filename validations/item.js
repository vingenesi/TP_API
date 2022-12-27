const Joi = require("joi");


async function ValidateTitem (req, res, next) {
    try {
        const authSchema = Joi.object({

            idPedido: Joi.number().empty().required().messages({
                "string.empty": `"idPedido" não pode ser vazia`,
                "any.required": `"idPedido" campo obrigatório`,
                "number.min": `"idPedido"  só recebe o caractere 1 ou 2`,
                "number.max": `"idPedido" só recebe o caractere 1 ou 2`,
              }),

            idProduto: Joi.number().empty().required().max(1).messages({
                "string.empty": `"idProduto" não pode ser vazia`,
                "any.required": `"idProduto" campo obrigatório`,
                "number.min": `"idProduto"  só recebe o caractere 1 ou 2`,
                "number.max": `"idProduto" só recebe o caractere 1 ou 2`,
              }),

            quantidade: Joi.number().empty().required().messages({
                "string.empty": `"quantidade" não pode ser vazia`,
                "any.required": `"quantidade" campo obrigatório`,
              }),

            total: Joi.number().empty().required().messages({
                "string.empty": `"total" não pode ser vazia`,
                "any.required": `"total" campo obrigatório`,
              }),

            observacao: Joi.string().empty().required().min(2).max(2000).messages({
                "string.empty": `"observacao" não pode ser vazia`,
                "any.required": `"observacao" campo obrigatório`,
                "string.min": `"observacao"  no mínimo 2 caracteres`,
                "string.max": `"observacao" no máximo 2000 caracteres`,
              }),
        });
        const { error } = authSchema.validate(req.body, { abortEarly: false });
        if (error) {
        throw Error(error);
        }
        return next();
    } catch (error) {
        res.status(error.status || 500).send({ error: error.message });
    }
}

module.exports = ValidateTitem