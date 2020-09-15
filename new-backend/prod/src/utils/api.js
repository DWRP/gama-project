"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
require('dotenv').config();
var _a = process.env, APP_KEY = _a.APP_KEY, APP_TOKEN = _a.APP_TOKEN;
var api = axios_1.default.create({
    headers: {
        "Content-Type": "application/json",
        "x-vtex-api-appKey": APP_KEY,
        "x-vtex-api-appToken": APP_TOKEN
    }
});
exports.default = api;
