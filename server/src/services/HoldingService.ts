import { db } from '../config/db';

export async function addOrUpdateHolding(userId: number, assetId: number, quantity: number) {
    return db.query(
        `INSERT INTO holdings (user_id, asset_id, quantity)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
        [userId, assetId, quantity, quantity]
    );
}
export async function getHoldingsByUserIdFromDB(userId: number) {
    const [rows] = await db.query(
        `SELECT h.asset_id, a.name, a.symbol, a.price, h.quantity
         FROM holdings h
                  JOIN assets a ON h.asset_id = a.id
         WHERE h.user_id = ?`,
        [userId]
    );

    return rows;
}


export async function sellUserAsset(userId: number, assetId: number, quantity: number) {
    // Вземи текущото количество
    const [rows] = await db.query<any[]>(
        `SELECT quantity FROM holdings WHERE user_id = ? AND asset_id = ?`,
        [userId, assetId]
);
    if (!rows.length) {
        throw new Error('No such asset in your portfolio');
    }

    const currentQty = Number(rows[0].quantity);

    if (currentQty < quantity) {
        throw new Error(`Not enough quantity to sell. You have ${currentQty}`);
    }


    const remaining = rows[0].quantity - quantity;

    if (remaining === 0) {
        await db.query(
            `DELETE FROM holdings WHERE user_id = ? AND asset_id = ?`,
            [userId, assetId]
        );
    } else {
        await db.query(
            `UPDATE holdings SET quantity = ? WHERE user_id = ? AND asset_id = ?`,
            [remaining, userId, assetId]
        );
    }
}


