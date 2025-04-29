import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../utils/requests';
import { UserCard } from '../../components/UserCard';
import styles from './styles.module.scss';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((res) => {
          if (res) setUser(res);
        })
        .catch(() => {
        });
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h3>User Details</h3>
      <div className={styles.container}>
        <UserCard key={user.id} {...user} /></div>
    </div>
  );
};
// TODO  create userDetails page, show user info by id; id declared in the url params, dynamically read id and get specific info for that user
