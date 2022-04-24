import mongoose from 'mongoose';

interface INote {
  name: string;
  category: string;
  date: Date;
  isActive: Boolean;
  content: string;
}

const { Schema, SchemaTypes } = mongoose;

const notesSchema = new Schema<INote>({
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

export default mongoose.model<INote>('note', notesSchema);
