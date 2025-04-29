import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './BuyAssetForm.module.css';

interface Asset {
    id: number;
    name: string;
    symbol: string;
    price: number;
}

interface Props {
    onSuccess: () => void;
}

const BuyAssetForm: React.FC<Props> = ({ onSuccess }) => {
    const { user, token } = useAuth();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [assetId, setAssetId] = useState<number>();
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        const fetchAssets = async () => {
            const res = await axios.get('http://localhost:5001/api/assets');
            setAssets(res.data);
        };
        fetchAssets();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5001/api/holdings',
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
            setQuantity(0);
            onSuccess();
        } catch (err) {
            console.error('Error buying asset', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h3 className={styles.formTitle}>Buy Asset</h3>
            <div className={styles.formRow}>
                <select
                    value={assetId}
                    onChange={(e) => setAssetId(Number(e.target.value))}
                    required
                >
                    <option value="">Select Asset</option>
                    {assets.map((asset) => (
                        <option key={asset.id} value={asset.id}>
                            {asset.name} ({asset.symbol})
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    step="0.1"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    required
                />

                <button type="submit" className={styles.buyBtn}>Buy</button>
            </div>
        </form>

    );
};

export default BuyAssetForm;