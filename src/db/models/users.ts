import { Collection } from './collections';
import * as sequelize from 'sequelize-typescript';
import { ForeignKey } from 'sequelize-typescript';

@sequelize.Table({
    timestamps: false,
    tableName: 'users',
})
export class User extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: false,
    })
    blocked!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: false,
    })
    isAdmin!: boolean;

    @sequelize.HasMany(() => Collection)
    userCollections!: Collection[];
}
