"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itemController_1 = require("./../controllers/itemController");
const express_1 = require("express");
const itemRouter = (0, express_1.Router)();
itemRouter.post('/createitem', itemController_1.createItem);
// router.get('/getusers', getAllUsers);
// router.get('/getuser/:id', getUser);
// router.get('/getuserstatus', getUserStatus);
// router.delete('/deleteuser', deleteUser);
// router.post('/signup', signUp);
// router.post('/signin', signIn);
// router.put('/block', toggleBlock);
// router.put('/unblock', toggleUnblock);
exports.default = itemRouter;
