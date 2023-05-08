import { left, right } from '@sweet-monads/either';
import { Sequelize } from 'sequelize';
import { Item } from '../db/models/item';
import { Like } from '../db/models/like';
import { DBError } from '../errors/DBError';
import { EntityError } from '../errors/EntityError';
import { IItemCreate, IItemUpdate } from '../interfaces/models/item';

class ItemService {
    async create(item: IItemCreate) {
        try {
            const { name, description, userId, collectionId, image } = item;
            const created = new Date().getTime();
            const newItem = await Item.create({
                name: name,
                description: description,
                collectionId: collectionId,
                userId: userId,
                created: created,
                image: image,
            });
            return right(newItem);
        } catch (e: any) {
            return left(new DBError('create item error', e));
        }
    }

    async getAllItems() {
        try {
            const items = await Item.findAll({
                include: { model: Like },
                order: [['created', 'DESC']],
            });
            return right(items);
        } catch (e: any) {
            return left(new DBError('get items error', e));
        }
    }
    async getTopRatedItems() {
        try {
            const likes = await Like.findAll({
                attributes: [
                    'itemId',
                    [Sequelize.fn('count', Sequelize.col('itemId')), 'count'],
                ],
                include: [
                    {
                        model: Item,
                        attributes: [
                            'name',
                            'image',
                            'created',
                            'collectionId',
                        ],
                    },
                ],
                group: [
                    'Like.itemId',
                    'name',
                    'image',
                    'created',
                    'collectionId',
                ],
                order: Sequelize.literal('count DESC'),
                raw: true,
                nest: true,
            });
            return right(likes);
        } catch (e: any) {
            return left(new DBError('getTopRatedItems error', e));
        }
    }

    async getOneItem(id: number) {
        const item = await Item.findOne({
            where: { id: id },
        });
        if (!item) {
            return left(
                new EntityError(`there is no item with id:${id} in data-base`)
            );
        }
        return right(item);
    }

    async getCollectionItems(id: number) {
        const items = await Item.findAll({
            where: { collectionId: id },
        });
        console.log('items', items);

        if (items.length === 0) {
            return left(
                new EntityError(
                    `there is no items for collection with id:${id} in data-base`
                )
            );
        }
        return right(items);
    }

    async deleteOneItem(id: number) {
        const item = await Item.destroy({
            where: { id: id },
        });

        if (!item) {
            return left(
                new EntityError(`there is no item with id:${id} in data-base`)
            );
        }
        return right(`item with id:${id} was deleted`);
    }

    async updateItem(newData: IItemUpdate) {
        const item = await Item.update(
            { ...newData },
            { where: { id: newData.id } }
        );

        if (item[0] === 0) {
            return left(
                new EntityError(
                    `there is no item with id:${newData.id} in data-base`
                )
            );
        }
        const updatedItem = await Item.findByPk(newData.id);
        return right(updatedItem);
    }

    async setLike(userId: number, itemId: number) {
        try {
            const newLike = await Like.create({
                itemId: itemId,
                userId: userId,
            });
            return right(newLike);
        } catch (e: any) {
            return left(new DBError('create item error', e));
        }
    }

    async unsetLike(id: number) {
        const like = await Item.destroy({
            where: { itemId: id },
        });
        if (!like) {
            return left(
                new EntityError(`there is no item with id:${id} in data-base`)
            );
        }
        return right(`like with id:${id} was deleted`);
    }
}
module.exports = new ItemService();
