import { Theme } from '../db/models/theme';
const CollectionService = require('../services/collection.service');
const UserService = require('../services/user.service');
const ItemService = require('../services/item.service');
import mokeData from '../utils/moke.json';
export const deleteAllIndexes = async (target: string) => {
    try {
        fetch(`${process.env.MEILISEARCH_HOST}/indexes/${target}/documents`, {
            method: 'DELETE',
            headers: {
                Authorization:
                    'Bearer 8e4b2915ac08ef93025cdb0a69c4a3b0c37fd4eb ',
            },
        });
    } catch (e) {
        console.log(e);
    }
};
export const themeCheck = async () => {
    const carTheme = await Theme.findOne({
        where: { name: 'rareJDMCars' },
    });

    if (!!!carTheme) {
        console.log('NP CAR');
        await Theme.create({
            name: 'rareJDMCars',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/rareJDMTheme.png?raw=true',
        });
    }

    const vineTheme = await Theme.findOne({ where: { name: 'rareVine' } });

    if (!vineTheme) {
        await Theme.create({
            name: 'rareVine',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/rareVineTheme2.png?raw=true',
        });
    }

    const coinTheme = await Theme.findOne({
        where: {
            name: 'coins',
        },
    });
    if (!coinTheme) {
        await Theme.create({
            name: 'coins',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/coinsTheme.jpg?raw=true',
        });
    }

    const moviesTheme = await Theme.findOne({
        where: {
            name: 'movies',
        },
    });
    if (!moviesTheme) {
        await Theme.create({
            name: 'movies',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/movieTheme.png?raw=true',
        });
    }

    const recordsTheme = await Theme.findOne({
        where: { name: 'vynil' },
    });
    if (!recordsTheme) {
        await Theme.create({
            name: 'vynil',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/vynilTheme.jpg?raw=true',
        });
    }

    const comicsTheme = await Theme.findOne({
        where: { name: 'comics' },
    });
    if (!comicsTheme) {
        await Theme.create({
            name: 'comics',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/comicsTheme.png?raw=true',
        });
    }

    const flowersTheme = await Theme.findOne({
        where: { name: 'flowers' },
    });
    if (!flowersTheme) {
        await Theme.create({
            name: 'flowers',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/flowersTheme.png?raw=true',
        });
    }
    const antiquesTheme = await Theme.findOne({
        where: { name: 'antiques' },
    });
    if (!antiquesTheme) {
        await Theme.create({
            name: 'antiques',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/antiquesTheme.jpg?raw=true',
        });
    }

    const stampsTheme = await Theme.findOne({
        where: { name: 'stamps' },
    });
    if (!stampsTheme) {
        await Theme.create({
            name: 'stamps',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/stampsTheme.png?raw=true',
        });
    }

    const autographsTheme = await Theme.findOne({
        where: { name: 'autographs' },
    });
    if (!autographsTheme) {
        await Theme.create({
            name: 'autographs',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/autographsTheme.png?raw=true',
        });
    }

    const mapsTheme = await Theme.findOne({
        where: {
            name: 'maps',
        },
    });
    if (!mapsTheme) {
        await Theme.create({
            name: 'maps',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/mapsTheme.png?raw=true',
        });
    }

    const eventsTheme = await Theme.findOne({
        where: { name: 'events' },
    });
    if (!eventsTheme) {
        await Theme.create({
            name: 'events',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/eventsTheme.png?raw=true',
        });
    }

    const otherTheme = await Theme.findOne({
        where: { name: 'other' },
    });
    if (!otherTheme) {
        await Theme.create({
            name: 'other',
            defaultImg:
                'https://github.com/dmtrack/collections_client/blob/dev-client/public/otherTheme.png?raw=true',
        });
    }

    await UserService.registration(mokeData.users.user1);
    await UserService.registration(mokeData.users.user2);
    await CollectionService.create(mokeData.collections.collection1);
    await CollectionService.create(mokeData.collections.collection2);
    await CollectionService.create(mokeData.collections.collection3);
    await CollectionService.create(mokeData.collections.collection4);
    await CollectionService.create(mokeData.collections.collection5);
    await ItemService.create(mokeData.items.item1);
    await ItemService.create(mokeData.items.item2);
    await ItemService.create(mokeData.items.item3);
    await ItemService.create(mokeData.items.item4);
    await ItemService.create(mokeData.items.item5);
    await ItemService.create(mokeData.items.item6);
    await ItemService.create(mokeData.items.item7);
    await ItemService.create(mokeData.items.item8);

    await ItemService.setLike(1, 1);
    await ItemService.setLike(1, 1);
    await ItemService.setLike(1, 1);
    await ItemService.setLike(1, 1);
    await ItemService.setLike(1, 2);
    await ItemService.setLike(1, 3);
    await ItemService.setLike(1, 3);
    await ItemService.setLike(1, 5);
    await ItemService.setLike(1, 4);
    await ItemService.setLike(1, 8);

    await ItemService.setLike(2, 3);
    await ItemService.setLike(2, 2);
    await ItemService.setLike(2, 1);
    await ItemService.setLike(2, 4);
    await ItemService.setLike(2, 4);
    await ItemService.setLike(2, 4);
    await ItemService.setLike(2, 4);
    await ItemService.setLike(1, 4);
    await ItemService.setLike(1, 4);
};
