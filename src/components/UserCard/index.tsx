import styles from './styles.module.scss';

interface UserCardProps extends User {}

export const UserCard: React.FC<UserCardProps> = ({first_name, last_name, email, avatar }) => {
  return (
    <div className={styles.card} >
    <img src={avatar} alt={`${first_name} ${last_name}`} className={styles.avatar} />
    <div className={styles.container}>
      <h4 >{`${first_name} ${last_name}`}</h4>
      <p>{email}</p>
    </div>
  </div>
  );
};
