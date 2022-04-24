const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const notesSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  category: {
    type: SchemaTypes.String,
    enum: {
      values: ['Task', 'Random Thought', 'Idea', 'Quote'],
      message:
        '{VALUE} is not supported. Options:`Task`, `Random Thought`, `Idea`, `Quote`',
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

const notesModel = mongoose.model('note', notesSchema);
module.exports = notesModel;
