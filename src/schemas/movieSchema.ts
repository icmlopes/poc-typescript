import Joi from "joi"

export const movieSchema = Joi.object({
    title: Joi.string().required(),
    genres: Joi.string().required(),
    platform: Joi.string().required(),
    watched: Joi.boolean(),
    comment: Joi.string()
})

