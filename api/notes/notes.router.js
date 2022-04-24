const express = require('express');
const notesController = require('./notes.controller');
const { validateCreateNote, validateUpdateNote } = require('./notes.validator');

const notesRouter = express.Router();

notesRouter.get('/stats', notesController.getStats);
notesRouter.get('/', notesController.getNotes);
notesRouter.get('/:id', notesController.getNotes);
notesRouter.post('/', validateCreateNote, notesController.postNote);
notesRouter.delete('/:id', notesController.deletePost);
notesRouter.patch('/:id', validateUpdateNote, notesController.editPost);

module.exports = notesRouter;
