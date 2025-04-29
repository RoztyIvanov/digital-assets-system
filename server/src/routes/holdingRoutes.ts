import express from 'express';
import { createHolding, getHoldingsByUserId, sellAsset } from '../controllers/holdingController';

const router = express.Router();

router.post('/', createHolding);
router.get('/:userId', getHoldingsByUserId);
router.post('/sell', sellAsset);

export default router;
