import React from 'react';
import styles from './styles.module.scss';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const randomId = Math.floor(Math.random() * 12) + 1;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>MyApp</div>
                <ul className={styles.navList}>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/users">Users</Link></li>
                    <li><Link to={`/users/${randomId}`}>User Details</Link></li>
                    <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
                </ul>
            </div>
        </nav>
    );
};
/* TODO make top navbar go to users page, home page, user details and logout */

/*I don't understand how it should work User Details page?  */
