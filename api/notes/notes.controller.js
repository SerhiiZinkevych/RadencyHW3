const notesModel = require('./notes.model');
const { Types } = require('mongoose');

class NotesController {
  async getNotes(req, res, next) {
    try {
      const id = req.params.id;
      const filter = id ? { _id: new Types.ObjectId(id) } : {};
      const notes = await notesModel.find(filter);
      return res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }
  async getStats(req, res, next) {
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
  async postNote(req, res, next) {
    try {
      const data = req.body;
      const newNote = await notesModel.create(data);
      return res.status(201).json(newNote);
    } catch (error) {
      next(error);
    }
  }
  async deletePost(req, res, next) {
    try {
      const id = req.params.id;
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
  async editPost(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
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

module.exports = new NotesController();
