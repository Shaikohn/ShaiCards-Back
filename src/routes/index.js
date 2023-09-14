const { Router } = require('express');
const userRouter = require('./userRoutes');
const cardRouter = require('./cardRoutes');
const unconfirmedCardRouter = require('./unconfirmedCardRoutes');

const router = Router();

router.use('/user', userRouter);
router.use('/cards', cardRouter)
router.use('/unconfirmedCards', unconfirmedCardRouter)

module.exports = router;