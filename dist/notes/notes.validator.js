"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
module.exports.validateCreateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserSchema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string()
            .valid('Task', 'Random Thought', 'Idea', 'Quote')
            .required(),
        date: Joi.date().required(),
        isActive: Joi.boolean().default(true),
        content: Joi.string().max(1000).required(),
    }).required();
    const result = createUserSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json(result.error);
    }
    next();
});
module.exports.validateUpdateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserSchema = Joi.object({
        name: Joi.string(),
        category: Joi.string().valid('Task', 'Random Thought', 'Idea', 'Quote'),
        date: Joi.date(),
        isActive: Joi.boolean().default(true),
        content: Joi.string().max(1000),
    }).required();
    const result = createUserSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json(result.error);
    }
    next();
});
