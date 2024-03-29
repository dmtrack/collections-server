import * as sequelize from 'sequelize-typescript';
import { Item } from './item';
import { User } from './user';

@sequelize.Table({
    timestamps: false,
    tableName: 'tokens',
})
export class Token extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
    refreshToken!: string;

    @sequelize.BelongsTo(() => User)
    user!: User;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    userId!: number;
}
