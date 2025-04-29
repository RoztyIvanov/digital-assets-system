import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Portfolio.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BuyAssetForm from '../../components/BuyAssetForm';
import SellAssetForm from '../../components/SellAssetForm';

type Holding = {
    asset_id: number;
    name: string;
    symbol: string;
    price: number;
    quantity: number;
};

const Portfolio: React.FC = () => {
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const fetchHoldings = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5001/api/holdings/${user?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setHoldings(response.data);
        } catch (error) {
            console.error('Error fetching holdings:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchHoldings = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/holdings/${user?.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(" Holdings from backend:", response.data);
                setHoldings(response.data);
            } catch (error) {
                console.error(' Error fetching holdings:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && token) {
            fetchHoldings();
        }
    }, [user, token]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={styles.portfolio}>
            <div className={styles.header}>
                <div>
                    <h1>Your Portfolio</h1>
                    <p>Welcome, {user?.name}!</p>
                </div>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {loading ? (
                <p>Loading holdings...</p>
            ) : Array.isArray(holdings) && holdings.length === 0 ? (
                <p>You have no assets yet.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Asset</th>
                        <th>Symbol</th>
                        <th>Quantity</th>
                        <th>Price ($)</th>
                        <th>Total Value ($)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {holdings.map((h) => (
                        <tr key={h.asset_id}>
                            <td>{h.name}</td>
                            <td>{h.symbol}</td>
                            <td>{h.quantity}</td>
                            <td>{Number(h.price).toFixed(2)}</td>
                            <td>{(Number(h.quantity) * Number(h.price)).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
    )}
            <BuyAssetForm onSuccess={() => window.location.reload()} />
            <SellAssetForm holdings={holdings} onSuccess={fetchHoldings} />
        </div>
    );
};

export default Portfolio;
