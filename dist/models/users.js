'use strict';
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require('sequelize-typescript');
let User = class User extends sequelize_typescript_1.Model {};
__decorate(
    [
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        }),
    ],
    User.prototype,
    'id',
    void 0
);
__decorate(
    [
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
        }),
    ],
    User.prototype,
    'nickname',
    void 0
);
__decorate(
    [
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
            unique: true,
        }),
    ],
    User.prototype,
    'email',
    void 0
);
__decorate(
    [
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
        }),
    ],
    User.prototype,
    'password',
    void 0
);
__decorate(
    [
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
        }),
    ],
    User.prototype,
    'registered',
    void 0
);
__decorate(
    [
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
        }),
    ],
    User.prototype,
    'login',
    void 0
);
__decorate(
    [
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.BOOLEAN,
            allowNull: false,
        }),
    ],
    User.prototype,
    'blocked',
    void 0
);
User = __decorate(
    [
        (0, sequelize_typescript_1.Table)({
            timestamps: false,
            tableName: 'students',
        }),
    ],
    User
);
exports.User = User;
