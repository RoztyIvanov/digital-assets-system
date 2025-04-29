import { Request, Response } from 'express';
import { getAllAssets } from '../services/assetService';
import { createAsset } from '../services/assetService';
import { updateAsset, deleteAsset } from '../services/assetService';

export async function fetchAssets(req: Request, res: Response) {
    try {
        const assets = await getAllAssets();
        res.json(assets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch assets' });
    }
}
export async function addAsset(req: Request, res: Response) {
    const { name, symbol, price } = req.body;
    if (!name || !symbol || typeof price !== 'number') {
        return res.status(400).json({ message: 'Invalid asset data' });
    }

    try {
        const result = await createAsset(name, symbol, price);
        res.status(201).json({ message: 'Asset created', id: (result as any).insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create asset' });
    }
}
export async function editAsset(req: Request, res: Response) {
    const { id } = req.params;
    const { name, symbol, price } = req.body;

    if (!name || !symbol || typeof price !== 'number') {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        await updateAsset(Number(id), name, symbol, price);
        res.json({ message: 'Asset updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update asset' });
    }
}

export async function removeAsset(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await deleteAsset(Number(id));
        res.json({ message: 'Asset deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete asset' });
    }
}