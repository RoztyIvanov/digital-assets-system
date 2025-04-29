import { db } from '../config/db';
import { Asset } from '../models/Asset';

export async function getAllAssets(): Promise<Asset[]> {
    const [rows] = await db.query('SELECT * FROM assets');
    return (rows as any[]).map(
        row => new Asset(row.id, row.name, row.symbol, row.price)
    );
}
export async function createAsset(name: string, symbol: string, price: number) {
    const [result] = await db.query(
        'INSERT INTO assets (name, symbol, price) VALUES (?, ?, ?)',
        [name, symbol, price]
    );
    return result;
}
export async function updateAsset(id: number, name: string, symbol: string, price: number) {
    await db.query(
        'UPDATE assets SET name = ?, symbol = ?, price = ? WHERE id = ?',
        [name, symbol, price, id]
    );
}

export async function deleteAsset(id: number) {
    await db.query('DELETE FROM assets WHERE id = ?', [id]);
}

