import { RequestHandler } from 'express';
import { Collection } from '../db/models/collections';
import { User } from '../db/models/users';

export const createCollection: RequestHandler = async (req, res, next) => {
    try {
        let collection = await Collection.create({ ...req.body });
        console.log(`collection ${collection.name} is created`);

        return res.status(200).json({
            message: 'collection created succesfully',
            data: collection,
        });
    } catch (err: any) {
        return err.message;
    }
};

export const getUser: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user: User | null = await User.findOne({
            where: { id: id },
        });
        if (user) {
            return res.status(200).json({
                message: `user with id:${id} is found`,
                user: user,
            });
        } else
            return res.status(200).json({
                message: `user with id:${id} is not found`,
            });
    } catch (err: any) {
        return res.status(404).json({
            error: 404,
            message: `${err.message}`,
        });
    }
};

// export const updateUser: RequestHandler = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         await User.update({ ...req.body }, { where: { id } });
//         const updatedUser: User | null = await User.findByPk(id);
//         return res.status(200).json({
//             message: `user with id: ${id} was updated`,
//             data: updatedUser,
//         });
//     } catch (err: any) {
//         return err.message;
//     }
// };

// export const signUp: RequestHandler = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         const user: User | null = await User.findOne({
//             where: { email: email },
//         });
//         const hash = new SHA3(256);
//         const hashpass = hash.update(password).digest('hex');

//         const obj = { ...req.body, blocked: false };
//         obj.password = hashpass;

//         if (Number(user) === 0) {
//             let user = await User.create({
//                 ...obj,
//             });
//             return res.status(200).json({
//                 message: `user with id:${user.id} was succesfully signed up`,
//                 data: user,
//             });
//         } else throw Error();
//     } catch (err: any) {
//         return res.status(409).json({
//             error: 409,
//             message: `user with email:${req.body.email} is already exist`,
//         });
//     }
// };

// export const signIn: RequestHandler = async (req, res, next) => {
//     try {
//         const { password, email, login } = req.body;
//         const hash = new SHA3(256);
//         const hashpass = hash.update(password).digest('hex');
//         const user: User | null = await User.findOne({
//             where: { password: hashpass, email: email },
//         });
//         console.log('found user:', user);
//         if (user) {
//             if (user.blocked === false) {
//                 await User.update({ login: login }, { where: { email } });
//                 return res.status(200).json({
//                     message: `user with id:${user.id} was succesfully signed up`,
//                     data: user,
//                 });
//             } else throw Error;
//         } else throw Error;
//     } catch (err: any) {
//         return res.status(401).json({
//             error: 401,
//             message: `access is not allowed`,
//         });
//     }
// };

// export const toggleBlock: RequestHandler = async (req, res, next) => {
//     try {
//         const { params } = req.body;
//         params.forEach(async (id: string) => {
//             const user = await User.findByPk(id);
//             if (user) {
//                 await User.update({ blocked: true }, { where: { id } });
//                 const updatedUser: User | null = await User.findByPk(id);
//             }
//         });
//         return res.status(200).json({
//             message: `user's status with id are changed`,
//             id: req.body,
//         });
//     } catch (err: any) {
//         return res.status(404).json({
//             error: 404,
//             message: `${err.message}`,
//         });
//     }
// };

// export const toggleUnblock: RequestHandler = async (req, res, next) => {
//     try {
//         const { params } = req.body;
//         params.forEach(async (id: string) => {
//             const user = await User.findByPk(id);
//             if (user) {
//                 await User.update({ blocked: false }, { where: { id } });
//                 const updatedUser: User | null = await User.findByPk(id);
//             }
//         });
//         return res.status(200).json({
//             message: `user's status with id are changed`,
//             id: req.body,
//         });
//     } catch (err: any) {
//         return res.status(404).json({
//             error: 404,
//             message: `${err.message}`,
//         });
//     }
// };

// export const deleteUser: RequestHandler = async (req, res, next) => {
//     try {
//         const { params } = req.body;
//         console.log(params, 'test');
//         params.forEach(async (id: string) => {
//             await User.destroy({ where: { id } });
//         });
//         return res.status(200).json({
//             message: `users status with ids are deleted`,
//             id: req.body,
//         });
//     } catch (err: any) {
//         return err.message;
//     }
// };

// export const getAllUsers: RequestHandler = async (req, res, next) => {
//     try {
//         const allUsers: User[] = await User.findAll();
//         return res
//             .status(200)
//             .json({ message: `users fetched successfully`, data: allUsers });
//     } catch (err: any) {
//         return err.message;
//     }
// };

// export const getUser: RequestHandler = async (req, res, next) => {
//     const id = req.params.id;
//     try {
//         const user: User | null = await User.findOne({
//             where: { id: id },
//         });
//         if (user) {
//             return res.status(200).json({
//                 message: `user with id:${id} is found`,
//                 user: user,
//             });
//         } else
//             return res.status(200).json({
//                 message: `user with id:${id} is not found`,
//             });
//     } catch (err: any) {
//         return res.status(404).json({
//             error: 404,
//             message: `${err.message}`,
//         });
//     }
// };

// export const getUserStatus: RequestHandler = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const user: User | null = await User.findByPk(id);
//         return res
//             .status(200)
//             .json({ message: `user with id: ${id} was fetched`, data: user });
//     } catch (err: any) {
//         return err.message;
//     }
// };
