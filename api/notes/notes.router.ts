import express, { Router } from 'express';
import notesController from './notes.controller';
import { validateCreateNote, validateUpdateNote } from './notes.validator';

const notesRouter: Router = express.Router();

notesRouter.get('/stats', notesController.getStats);
notesRouter.get('/', notesController.getNotes);
notesRouter.get('/:id', notesController.getNotes);
notesRouter.post('/', validateCreateNote, notesController.postNote);
notesRouter.delete('/:id', notesController.deletePost);
notesRouter.patch('/:id', validateUpdateNote, notesController.editPost);

export default notesRouter;
