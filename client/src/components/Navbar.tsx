import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link to="/" className={styles.link}>
                    Home
                </Link>
                {token && (
                    <Link to="/portfolio" className={styles.link}>
                        Portfolio
                    </Link>
                )}
                <Link to="/contact" className={styles.link}>
                    Contact
                </Link>
            </div>

            <div className={styles.right}>
                {token ? (
                    <>
                        <span className={styles.username}>Hi, {user?.name}</span>
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.link}>
                            Login
                        </Link>
                        <Link to="/register" className={styles.link}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
export default Navbar;
