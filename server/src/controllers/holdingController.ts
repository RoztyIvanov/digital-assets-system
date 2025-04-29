import { Request, Response } from 'express';
import { addOrUpdateHolding, getHoldingsByUserIdFromDB } from '../services/holdingService';
import { sellUserAsset } from '../services/holdingService';

export const createHolding = async (req: Request, res: Response) => {
    const { userId, assetId, quantity } = req.body;

    if (!userId || !assetId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        await addOrUpdateHolding(userId, assetId, quantity);
        res.status(201).json({ message: 'Asset added to portfolio' });
    } catch (error) {
        console.error('[createHolding] Error:', error);
        res.status(500).json({ message: 'Error adding asset to portfolio' });
    }

};
export const getHoldingsByUserId = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    try {
        const holdings = await getHoldingsByUserIdFromDB(userId);
        res.status(200).json(holdings);
    } catch (error) {
        console.error('[getHoldingsByUserId] Error:', error);
        res.status(500).json({message: 'Error fetching holdings'});
    }
};
export const sellAsset = async (req: Request, res: Response) => {
    const { userId, assetId, quantity } = req.body;

    if (!userId || !assetId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid request.' });
    }

    try {
        await sellUserAsset(userId, assetId, quantity);
        res.status(200).json({ message: 'Asset sold successfully' });
    } catch (error) {
        console.error('[Sell Asset]', error);
        res.status(500).json({ message: 'Failed to sell asset' });
    }
};