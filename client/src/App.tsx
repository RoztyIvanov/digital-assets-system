import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Portfolio from './pages/Portfolio/Portfolio';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar';
import styles from './App.module.css';
import Register from './pages/Register/Register';
import PrivateRoute from './components/PrivateRoute';
import Contact from './pages/Contact/Contact';


function App() {
    return (
        <Router>
            <div className={styles.app}>
                <Navbar />
                <div className={styles.content}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/portfolio"
                            element={
                                <PrivateRoute>
                                    <Portfolio />
                                </PrivateRoute>
                        }/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
