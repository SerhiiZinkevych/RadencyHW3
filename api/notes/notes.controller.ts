import notesModel from './notes.model';
import { Types } from 'mongoose';
import { NextFunction, Request, Response } from 'express';

class NotesController {
  async getNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const filter: Object = id ? { _id: new Types.ObjectId(id) } : {};
      const notes = await notesModel.find(filter);
      return res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await notesModel.aggregate([
        {
          $group: {
            _id: '$category',
            active: {
              $sum: { $cond: ['$isActive', 1, 0] },
            },
            archived: {
              $sum: { $cond: ['$isActive', 0, 1] },
            },
          },
        },
      ]);
      return res.status(200).json({ stats });
    } catch (error) {
      next(error);
    }
  }
  async postNote(req: Request, res: Response, next: NextFunction) {
    try {
      const data: Object = req.body;
      const newNote = await notesModel.create(data);
      return res.status(201).json(newNote);
    } catch (error) {
      next(error);
    }
  }
  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const deletedNote = await notesModel.findByIdAndDelete(id);

      if (!deletedNote) {
        return res
          .status(404)
          .json({ message: `Note with id '${id}' not found 😔` });
      }
      return res
        .status(200)
        .json({ message: `Successfully deleted note with id '${id}' 🙂` });
    } catch (error) {
      next(error);
    }
  }
  async editPost(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const data: Object = req.body;
      const editedNote = await notesModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!editedNote) {
        return res
          .status(404)
          .json({ message: `Note with id '${id}' not found 😔` });
      }
      return res.status(200).json(editedNote);
    } catch (error) {
      next(error);
    }
  }
}

export default new NotesController();
