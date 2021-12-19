const router = require('express').Router();

const { register, login } = require('../services/users');

router.post('/register', async (req, res) => {
    const { email, password, isVendor } = req.body;

    try {
        if (!email.trim()) {
            throw new Error('Email is required!');
        }

        if (password.trim().length < 3) {
            throw new Error('Password must be atleast 3 characters long!');
        }

        const userData = await register(email.toLocaleLowerCase().trim(), password.trim(), isVendor);

        res.json(userData);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await login(email, password);

        res.json(userData);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    res.status(204).end();
});

module.exports = router;