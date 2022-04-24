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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notes_model_1 = __importDefault(require("./notes.model"));
const mongoose_1 = require("mongoose");
class NotesController {
    getNotes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const filter = id ? { _id: new mongoose_1.Types.ObjectId(id) } : {};
                const notes = yield notes_model_1.default.find(filter);
                return res.status(200).json(notes);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getStats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stats = yield notes_model_1.default.aggregate([
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
            }
            catch (error) {
                next(error);
            }
        });
    }
    postNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const newNote = yield notes_model_1.default.create(data);
                return res.status(201).json(newNote);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const deletedNote = yield notes_model_1.default.findByIdAndDelete(id);
                if (!deletedNote) {
                    return res
                        .status(404)
                        .json({ message: `Note with id '${id}' not found 😔` });
                }
                return res
                    .status(200)
                    .json({ message: `Successfully deleted note with id '${id}' 🙂` });
            }
            catch (error) {
                next(error);
            }
        });
    }
    editPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = req.body;
                const editedNote = yield notes_model_1.default.findByIdAndUpdate(id, data, {
                    new: true,
                });
                if (!editedNote) {
                    return res
                        .status(404)
                        .json({ message: `Note with id '${id}' not found 😔` });
                }
                return res.status(200).json(editedNote);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
module.exports = new NotesController();
