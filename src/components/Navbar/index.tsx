import React from 'react';
import styles from './styles.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    console.log(id);
    
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
                    <li><Link to={`/users/${2}`}>User Details</Link></li> 
                    <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
                </ul>
            </div>
        </nav>
    );
};
/* TODO make top navbar go to users page, home page, user details and logout */
