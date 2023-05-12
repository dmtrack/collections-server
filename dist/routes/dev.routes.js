'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.devRouter = void 0;
const express_1 = require("express");
const devController_1 = require("../controllers/devController");
const controller = new devController_1.DevController();
exports.devRouter = (0, express_1.Router)();
exports.devRouter.post('/meilisearch_setup', controller.meiliSearchSetup);
exports.devRouter.post('/indexing/collections', controller.indexingCollections);
exports.devRouter.post('/indexing/items', controller.indexingItems);
exports.devRouter.post('/indexing/comments', controller.indexingComments);
