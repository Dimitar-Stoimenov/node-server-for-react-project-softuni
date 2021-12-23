const router = require('express').Router();

const { isAuth } = require('../middlewares/guards')
const { create, getByUserId } = require('../services/order');
const { parseError } = require('../util');

router.get('/', isAuth(), async (req, res) => {
    const userId = req.user._id;

    const data = await getByUserId(userId);

    res.json(data);
});


router.post('/', isAuth(), async (req, res) => {
    const data = {
        price: Number(req.body.price),
        itemList: req.body.itemList,
        userId: req.user._id,
        date: new Date(),
    };

    try {
        const result = await create(data);

        res.status(201).json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(err.status || 400).json({ message });
    }
});

module.exports = router;