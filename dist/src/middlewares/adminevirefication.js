"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        throw new index_js_1.UnAuthenticatedError("Not authorized as an admin");
    }
    next();
};
exports.default = isAdmin;
