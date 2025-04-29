import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: '#1f2937',
            color: '#fff'
        }}>
            <div>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                    Home
                </Link>
                {token && (
                    <Link to="/portfolio" style={{ color: 'white', textDecoration: 'none' }}>
                        Portfolio
                    </Link>
            )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link
                    to="/contact"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        marginRight: '1rem'
                    }}
                >
                    Contact
                </Link>

                {token ? (
                    <>
                        <span style={{ marginRight: '1rem' }}>Hi, {user?.name}</span>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#e11d48',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            style={{ color: 'white', textDecoration: 'none' }}
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>

        </nav>
    );
};

export default Navbar;
