"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path_1.default.extname(file.originalname);
        const baseName = path_1.default.basename(file.originalname, ext);
        cb(null, `${timestamp}-${baseName}${ext}`);
    }
});
const checkFileType = (file, cb) => {
    const filetypes = /jpeg|png|gif/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        cb(null, true);
    }
    else {
        cb(new Error('Error: Images Only!'));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 40000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});
exports.default = upload;
