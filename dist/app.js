"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const authRoute_1 = __importDefault(require("./src/routes/authRoute"));
const userRoute_1 = __importDefault(require("./src/routes/userRoute"));
const songRouter_1 = __importDefault(require("./src/routes/songRouter"));
const adminRoute_1 = __importDefault(require("./src/routes/adminRoute"));
app.use('/api', authRoute_1.default);
app.use('/api', userRoute_1.default);
app.use('/api', songRouter_1.default);
app.use('/api', adminRoute_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.all('*', (req, res, next) => {
    res.status(400).json({ success: false, msg: 'wrong url path' });
    console.log(`${req.originalUrl} doesnt exist`);
    next();
});
const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}....`);
});
