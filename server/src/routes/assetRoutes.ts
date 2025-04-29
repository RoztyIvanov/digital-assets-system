import express from 'express';
import { fetchAssets } from '../controllers/assetController';
import { addAsset } from '../controllers/assetController';
import { editAsset, removeAsset } from '../controllers/assetController';
import {db} from "../config/db";

const router = express.Router();

router.get('/', fetchAssets);
router.post('/', addAsset);
router.put('/:id', editAsset);
router.delete('/:id', removeAsset);
router.get('/', async (req, res) => {
    try {
        const [assets] = await db.query('SELECT * FROM assets');
        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assets' });
    }
});

export default router;
