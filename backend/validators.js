// validators.js
import Joi from 'joi';

const techSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
});

const siteSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
});

const noteSchema = Joi.object({
  note: Joi.string().trim().min(1).max(1000).required(),
  job: Joi.string().trim().min(1).max(100).required(),
  tech: Joi.string().trim().min(1).max(100).required(),
  timestamp: Joi.date().iso().required(),
});

export const validateTech = (data) => techSchema.validate(data);
export const validateSite = (data) => siteSchema.validate(data);
export const validateNote = (data) => noteSchema.validate(data);