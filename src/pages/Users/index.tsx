import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getUsers } from '../../utils/requests';
import { UserCard } from '../../components/UserCard';
        
export const Users: React.FC = () => {
    const [users, setUsers] = useState([]); // TODO define global type User type and , The state is to that type

    useEffect(() => {
        getUsers()
            .then(res => console.log(res))
            .catch(() => console.log("error")) // TODO handle this error, for example use react toastify package and toast error 
    });

    return (
        <div>
            <h3>there show user list</h3>
            {users.map((user) => (
                <UserCard { ...user as any } /> // TODO as any remove after declare global User type
            ))}
        </div>
    );
};