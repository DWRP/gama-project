"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var OrderController_1 = __importDefault(require("./src/controllers/OrderController"));
var ServerController_1 = __importDefault(require("./src/controllers/ServerController"));
var routes = express_1.default.Router();
routes.get('/', ServerController_1.default.index);
routes.get('/status', ServerController_1.default.status);
routes.get("/:shop/orders/:id", OrderController_1.default.show);
routes.get("/orders/:id", OrderController_1.default.show);
exports.default = routes;
