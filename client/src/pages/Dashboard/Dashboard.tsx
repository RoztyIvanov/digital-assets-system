import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './Dashboard.module.css';

type Asset = {
    id: number;
    name: string;
    symbol: string;
    price: number;
};

const Dashboard: React.FC = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [newAsset, setNewAsset] = useState({ name: '', symbol: '', price: '' });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ name: '', symbol: '', price: '' });

    const fetchAssets = async () => {
        try {
            const response = await api.get<Asset[]>('/assets');
            setAssets(response.data);
        } catch (error) {
            console.error('Error fetching assets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, symbol, price } = newAsset;
        if (!name || !symbol || !price) return;

        try {
            await api.post('/assets', {
                name,
                symbol,
                price: parseFloat(price),
            });
            setNewAsset({ name: '', symbol: '', price: '' });
            fetchAssets();
        } catch (error) {
            console.error('Error creating asset:', error);
        }
    };

    const startEdit = (asset: Asset) => {
        setEditingId(asset.id);
        setEditForm({
            name: asset.name,
            symbol: asset.symbol,
            price: asset.price.toString(),
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ name: '', symbol: '', price: '' });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const saveEdit = async (id: number) => {
        try {
            await api.put(`/assets/${id}`, {
                name: editForm.name,
                symbol: editForm.symbol,
                price: parseFloat(editForm.price),
            });
            setEditingId(null);
            fetchAssets(); //
        } catch (error) {
            console.error('Error updating asset:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/assets/${id}`);
            fetchAssets(); //
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    };

    return (
        <div className={styles.dashboard}>
            <h1>Market Overview</h1>

            <form className={styles.form} onSubmit={handleAdd}>
                <input
                    name="name"
                    placeholder="Asset Name"
                    value={newAsset.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="symbol"
                    placeholder="Symbol"
                    value={newAsset.symbol}
                    onChange={handleChange}
                    required
                />
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={newAsset.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Asset</button>
            </form>

            {loading ? (
                <p>Loading assets...</p>
            ) : (
                <table className={styles.assetTable}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price ($)</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assets.map(asset => (
                        <tr key={asset.id}>
                            <td>
                                {editingId === asset.id ? (
                                    <input
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    asset.name
                                )}
                            </td>
                            <td>
                                {editingId === asset.id ? (
                                    <input
                                        name="symbol"
                                        value={editForm.symbol}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    asset.symbol
                                )}
                            </td>
                            <td>
                                {editingId === asset.id ? (
                                    <input
                                        name="price"
                                        type="number"
                                        value={editForm.price}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    Number(asset.price).toFixed(2)
                                )}
                            </td>
                            <td>
                                {editingId === asset.id ? (
                                    <>
                                        <button onClick={() => saveEdit(asset.id)}>Save</button>
                                        <button onClick={cancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEdit(asset)}>Edit</button>
                                        <button onClick={() => handleDelete(asset.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;
