import { Request, Response } from 'express';
import { IUserResponse } from './../interfaces/controllers/userController.interface';
import { RequestHandler } from 'express';
import { IUser } from '../interfaces/models/user';
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../errors/api-error');

class UserController {
    registration: RequestHandler = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.badRequest(
                        'Ошибка валидации при регистрации',
                        errors.array()
                    )
                );
            }
            const response = await userService.registration(req);
            // res.cookie('refreshToken', response.value.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     sameSite: 'none',
            //     domain: process.env.CORS_ORIGIN,
            // });
            response
                .mapRight((user: IUserResponse) => res.status(200).json(user))
                .mapLeft((e: any) => res.status(401).json(e.message));
        } catch (e) {
            next(e);
        }
    };

    login: RequestHandler = async (req: Request, res: Response, next) => {
        const { password, email } = req.body;
        const response = await userService.login(email, password);
        // res.cookie('refreshToken', response.value.refreshToken, {
        //     maxAge: 30 * 24 * 60 * 60 * 1000,
        //     httpOnly: true,
        //     sameSite: 'none',
        //     domain: process.env.CORS_ORIGIN,
        // });
        response
            .mapRight((user: IUserResponse) => res.status(200).json(user))
            .mapLeft((e: any) => res.status(401).json(e));
    };

    reconnect: RequestHandler = async (req, res, next) => {
        const { id } = req.body;
        const response = await userService.reconnect(id);

        // res.cookie('refreshToken', response.value.refreshToken, {
        //     maxAge: 30 * 24 * 60 * 60 * 1000,
        //     httpOnly: true,
        //     sameSite: 'none',
        //     domain: process.env.CORS_ORIGIN,
        // });

        response
            .mapRight((user: IUserResponse) => res.status(200).json(user))
            .mapLeft((e: any) => res.status(401).json(e));
    };
    activate: RequestHandler = async (req, res, next) => {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(`${process.env.CLIENT_URL}`);
        } catch (e) {
            next(e);
        }
    };

    logout: RequestHandler = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            // res.clearCookie('refreshToken', {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     sameSite: 'none',
            //     domain: process.env.CORS_ORIGIN,
            // });
            return res.status(200).json(token);
        } catch (e) {
            next(e);
        }
    };

    refresh: RequestHandler = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            console.log(userData);

            // res.cookie('refreshToken', userData.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     sameSite: 'none',
            //     domain: process.env.CORS_ORIGIN,
            // });
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    };

    getAllUsers: RequestHandler = async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    };

    getUser: RequestHandler = async (req, res, next) => {
        const id = req.params.id;
        const response = await userService.getOneUser(id);
        response
            .mapRight((user: IUser) => {
                res.status(200).json(user);
            })
            .mapLeft((e: any) => res.status(401).json(e));
    };

    toggleBlock: RequestHandler = async (req, res, next) => {
        try {
            const dataId = req.body;
            dataId.forEach(async (id: number) => {
                await userService.toggleBlock(id);
            });
            return res.status(200).json({
                message: `users with ids:${dataId} are blocked`,
                userId: dataId,
            });
        } catch (e) {
            return res.json(e);
        }
    };

    toggleUnBlock: RequestHandler = async (req, res, next) => {
        const dataId = req.body;
        try {
            dataId.forEach(async (id: number) => {
                await userService.toggleUnBlock(id);
            });
            return res.status(200).json({
                message: `users with ids:${dataId} are unblocked`,
                userId: dataId,
            });
        } catch (e) {
            return res.json(e);
        }
    };

    deleteUser: RequestHandler = async (req, res, next) => {
        const dataId = req.body;

        try {
            dataId.forEach(async (id: string) => {
                await userService.deleteUser(id);
            });
            return res.status(200).json({
                message: `users with ids:${dataId} are deleted`,
                userId: dataId,
            });
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new UserController();
