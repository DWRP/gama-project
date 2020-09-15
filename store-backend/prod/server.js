"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
var whitelist = (_a = process.env.WORKSPACES) === null || _a === void 0 ? void 0 : _a.split(',').map(function (item) { return item + "--" + process.env.SHOP_URL; });
var corsOptions = {
    origin: whitelist
};

app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
app.listen(8080);
