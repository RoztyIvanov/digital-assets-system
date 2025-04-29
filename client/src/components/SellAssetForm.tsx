import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Asset {
    asset_id: number;
    name: string;
    symbol: string;
    quantity: number;
}

interface Props {
    holdings: Asset[];
    onSuccess: () => void;
}

const SellAssetForm: React.FC<Props> = ({ holdings, onSuccess }) => {
    const { user, token } = useAuth();
    const [assetId, setAssetId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!assetId || quantity <= 0) return;

        try {
            await axios.post(
                'http://localhost:5001/api/holdings/sell',
                {
                    userId: user?.id,
                    assetId,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAssetId(null);
            setQuantity(0);
            onSuccess(); // refresh portfolio
        } catch (error) {
            console.error(' Error selling asset:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
            <h3>Sell Asset</h3>

            <select
                value={assetId || ''}
                onChange={(e) => setAssetId(Number(e.target.value))}
                required
            >
                <option value="">Select an asset</option>
                {holdings.map((h) => (
                    <option key={h.asset_id} value={h.asset_id}>
                        {h.name} ({h.symbol}) – available: {h.quantity}
                    </option>
                ))}
            </select>
            <input
                type="number"
                step="0.01"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                required
                style={{ marginLeft: '1rem' }}
            />

            <button type="submit" style={{ marginLeft: '1rem' }}>
                Sell
            </button>
        </form>
    );
};

export default SellAssetForm;
