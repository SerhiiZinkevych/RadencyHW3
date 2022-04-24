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
// const express = require('express');
// const Mongoose = require('mongoose');
// const logger = require('morgan');
// const cors = require('cors');
const notesRouter = require('./notes/notes.router');
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// import notesRouter from './notes/notes.router';
dotenv_1.default.config();
class Server {
    constructor() {
        this.server = (0, express_1.default)();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.initServer();
            yield this.initDB();
            this.initMiddleWares();
            this.initRoutes();
            return this.startListening();
        });
    }
    initDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(process.env.MONGODB_URL || '');
                console.log('\x1b[32m%s\x1b[0m', 'Database connection successful.');
            }
            catch (error) {
                console.log('\x1B[31m%s\x1b[0m', 'Failed to connect to database.');
                console.log(error);
                process.exit(1);
            }
        });
    }
    initMiddleWares() {
        const formatsLogger = this.server.get('env') === 'development' ? 'dev' : 'short';
        this.server.use((0, morgan_1.default)(formatsLogger));
        this.server.use((0, cors_1.default)());
        this.server.use(express_1.default.json());
    }
    initRoutes() {
        this.server.use('/notes', notesRouter);
        this.server.use((req, res) => {
            res.status(404).json({ message: 'Not found' });
        });
        this.server.use((err, req, res) => {
            res.status(500).json({ message: err.message });
        });
    }
    startListening() {
        return this.server.listen(process.env.PORT, () => {
            console.log('Server started listening on port:', '\x1b[33m', process.env.PORT, '\x1b[0m');
        });
    }
}
exports.default = Server;
// module.exports = Server;
