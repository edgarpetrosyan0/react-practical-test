
import React, { useEffect, useState } from 'react';
import { getUserById } from '../../utils/requests';
import { UserCard } from '../../components/UserCard';
import styles from './styles.module.scss';

export const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 12) + 1;
    getUserById(randomId.toString()).then(setUser);
  }, []);

  return (
    <div>
    <div className={styles.container}>
    {user && <UserCard {...user} />}
    </div>
  </div>
  );
};
 // TODO make home page and show random user info used https://reqres.in/api/users/:id or other api as you wish
