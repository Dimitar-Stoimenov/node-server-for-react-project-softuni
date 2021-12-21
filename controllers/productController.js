const router = require('express').Router();

const { isAuth, isOwner, isVendor } = require('../middlewares/guards')
const { getAll, create, update, remove, getByOwnerId } = require('../services/product');
const { parseError } = require('../util');
const preload = require('../middlewares/preload');

router.get('/', async (req, res) => {
    const data = await getAll();

    res.json(data);
});

router.get('/my-products', isAuth(), isVendor(), async (req, res) => {
    const userId = req.user._id

    const data = await getByOwnerId(userId);

    res.json(data);
});

router.get('/most-popular', async (req, res) => {
    const data = await getAll();

    let sortedArr = data.sort((a, b) => {
        if (b.likes.length == a.likes.length) {
            return b.price - a.price;
        }

        return b.likes.length - a.likes.length;
    });

    let sortedData = [sortedArr[0], sortedArr[1], sortedArr[2]];

    res.json(sortedData);
});

router.post('/', isVendor(), async (req, res) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        image: req.body.image,
        owner: req.user._id,
        category: req.body.category,
    };

    try {
        const result = await create(data);

        res.status(201).json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(err.status || 400).json({ message });
    }
});

router.get('/:id', preload(), async (req, res) => {
    // const item = await getById(req.params.id); //не вадим от базата, понеже middleware-a вече го е взел и закачил в req.data;
    const item = req.data.toObject();

    item._ownerId = item.owner.toString();

    res.json(item);
});

router.put('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    const updated = {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        image: req.body.image,
    };

    try {
        const result = await update(req.data, updated);

        res.status(200).json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(err.status || 400).json({ message });
    }
});

router.delete('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    try {
        await remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
})

module.exports = router;