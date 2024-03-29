import { Either, left, right } from '@sweet-monads/either';
import { Sequelize } from 'sequelize';
import { Item } from '../db/models/item';
import { Like } from '../db/models/like';
import { Comment } from '../db/models/comment';
import { DBError } from '../errors/DBError';
import { EntityError } from '../errors/EntityError';
import { IItemCreate, IItemUpdate, ITagCount } from '../interfaces/models/item';
import { filterItem } from '../utils/item.utils';
import { TagType } from '../interfaces/models/common';
import {
    createTagsQuery,
    getMostPopularTagsQuery,
} from './queries/itemQueries';
import { ItemsTags } from '../db/models/ItemsTags';
import { Tag } from '../db/models/tag';
import { removeItemCommentsIndexes } from './search.service';

class ItemService {
    async create(item: IItemCreate) {
        try {
            let { userId, collectionId, image, fields, tags, description } =
                item;
            if (!image) {
                image =
                    'https://github.com/dmtrack/collections_client/blob/dev-client/public/defaultItemImage.png?raw=true';
            }

            const created = new Date().getTime();
            const newItem = await Item.create({
                collectionId,
                description,
                userId,
                created,
                image: image,
                ...fields,
                tags,
            });

            const newTagsResponse = await this.createItemTags(tags, newItem.id);
            return right(
                newTagsResponse.map(
                    (newTags) =>
                        ({ ...filterItem(newItem), tags: newTags } as Item)
                )
            );
        } catch (e: any) {
            return left(new DBError('create item error', e));
        }
    }

    async createItemTags(tags: TagType[], itemId: number) {
        try {
            const addedTags = tags.filter((tag) => tag.id);
            const createdTags = await createTagsQuery(
                tags.filter((tag) => !tag.id)
            );
            const itemTags = [...addedTags, ...createdTags].map((tag) => ({
                itemId,
                tagId: tag.id,
            }));
            await ItemsTags.bulkCreate(itemTags);
            return right([...addedTags, ...createdTags]);
        } catch (e) {
            return left(new DBError('Create item tags error', e));
        }
    }
    async getAllItems() {
        try {
            const items = await Item.findAll({
                include: [{ model: Like }, { model: Tag }],
                order: [['created', 'DESC']],
            });

            return right(items);
        } catch (e: any) {
            console.log(e);

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
                            'description',
                        ],
                    },
                ],
                group: [
                    'Like.itemId',
                    'name',
                    'image',
                    'created',
                    'collectionId',
                    'description',
                ],
                order: Sequelize.literal('count DESC'),
                raw: true,
                nest: true,
            });

            return right(likes);
        } catch (e: any) {
            console.log(e);

            return left(new DBError('getTopRatedItems error', e));
        }
    }

    async getTopCommentedItems() {
        try {
            const comments = await Comment.findAll({
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
                            'collectionId',
                            'description',
                        ],
                    },
                ],
                group: [
                    'Comment.itemId',
                    'name',
                    'image',
                    'collectionId',
                    'description',
                ],
                order: Sequelize.literal('count DESC'),
                raw: true,
                nest: true,
            });
            console.log(comments);

            return right(comments);
        } catch (e: any) {
            console.log(e);

            return left(new DBError('getTopComments error', e));
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
        await removeItemCommentsIndexes(id);
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
        const { id } = newData.item;
        const item = await Item.update(
            { ...newData.item },
            { where: { id: id } }
        );

        if (item[0] === 0) {
            return left(
                new EntityError(
                    `there is no item with id:${newData.item.id} in data-base`
                )
            );
        }
        const updatedItem = await Item.findByPk(Number(newData.item.id));
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
    async getMostPopularTags(): Promise<Either<DBError, ITagCount[]>> {
        try {
            const countTags: ITagCount[] = (
                await getMostPopularTagsQuery()
            ).map((countTag) => ({
                tagId: countTag.tagId,
                count: +countTag.dataValues.count,
            }));
            return right(countTags);
        } catch (e) {
            console.log(e);
            return left(new DBError('getMostPopularTags: Error', e));
        }
    }
}
module.exports = new ItemService();
