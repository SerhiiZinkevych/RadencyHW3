"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, SchemaTypes } = mongoose_1.default;
const notesSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    category: {
        type: SchemaTypes.String,
        enum: {
            values: ['Task', 'Random Thought', 'Idea', 'Quote'],
            message: '{VALUE} is not supported. Options:`Task`, `Random Thought`, `Idea`, `Quote`',
        },
        required: [
            true,
            'Field is required. Options:`Task`, `Random Thought`, `Idea`, `Quote`',
        ],
    },
    date: { type: SchemaTypes.Date, required: true },
    isActive: { type: SchemaTypes.Boolean, default: true },
    content: {
        type: SchemaTypes.String,
        required: true,
        maxlength: [
            1000,
            'Field is longer than the maximum allowed length (1000).',
        ],
    },
});
exports.default = mongoose_1.default.model('note', notesSchema);
