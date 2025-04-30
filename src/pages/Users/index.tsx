import { useEffect, useState } from 'react';
import { getUsers } from '../../utils/requests';
import { UserCard } from '../../components/UserCard';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';


export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(res => {
        if (res) {
          setUsers(res);
        }
        else {
          toast.error("Failed to load users.");
        }
      })
      .catch((error) => toast.error(error));
  }, []);


  return (
    <div>
      <h3>User List</h3>
      <div className={styles.container}>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
      </div>
    </div>
  );
};